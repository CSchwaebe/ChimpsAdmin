import { Component, OnInit, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Block } from '../../types/block';
import { BlockDirective } from '../../directives/block.directive';
import { BlockService } from 'src/app/services/block.service';
import { Page } from '../../models/page';
//import { Draggable, Swappable, Sortable, sortableEvent, draggableEvent, draggableInitializedEvent } from '@shopify/draggable';
import { PageService } from 'src/app/services/page.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { Collection } from 'src/app/models/admin/collection';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})

export class PageComponent implements OnInit, AfterViewInit {
  /*@Input()*/
  model: Page = {
    title: undefined,
    stub: undefined,
    blocks: [],
    menu: {
      location: undefined,
      level: undefined,
    }
  }

  blocks: Block[];
  viewContainerRef: ViewContainerRef;
  toolbar: boolean = false;
  location: boolean = false;
  //For location
  allGroups: Collection[];
  collections: Collection[];
  categories: Collection[];
  subcategories: Collection[];

  //For Adding a new Block
  options: string[] = [
    'Text',
    'Image',
    'Video', 
    'Spacer'
  ]
  type: string = '';
  style = {
    width: '',
  }
  videoURL: string = '';

  subscription: Subscription;


  @ViewChild(BlockDirective) blockDirective: BlockDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private BlockService: BlockService,
    public PageService: PageService,
    private SnackbarService: SnackbarService,
    private Router: Router,
    private CollectionService: CollectionService
  ) {
    this.subscription = this.PageService.isDirty().subscribe(status => {
      this.model.blocks = this.PageService.blocks;
      this.loadComponents();
    });

    
  }

  async ngOnInit() {
    this.viewContainerRef = this.blockDirective.viewContainerRef;

    let exists = await this.checkForPage();

    if (exists)
      this.loadComponents();
    else {
      //this.blocks = this.BlockService.getBlocks();
      this.model.title = 'Page Title';
      this.model.blocks = this.PageService.blocks;

      this.addFirstBlock();

      this.loadComponents();
    }
  }

  async checkForPage() {
    let index = this.Router.url.lastIndexOf('/');
    let stub = this.Router.url.substring(index + 1);

    let page = await this.PageService.getByStub(stub);
    console.log(page)
    
    if (page) {
      this.model = page;
      const blocks = this.model.blocks;

      for (let i = 0; i < blocks.length; i++) {
        await this.PageService.addBlock(this.BlockService.attachComponentToData(blocks[i].data.type, blocks[i].data))
        console.log("added block " + i)
      }

      await this.getCollections();
      this.getCategories();
      this.getSubcategories();

      return true;
    } else {
      this.getCollections();
      return false;
    }
      

  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {

  }

  addFirstBlock() {
    this.PageService.addBlock(this.BlockService.newTextBlock('50%', this.PageService.blocks.length));
  }



  loadComponents() {
    console.log(this.model.blocks);
    this.viewContainerRef.clear();
    for (let i = 0; i < this.model.blocks.length; i++) {

      //Basicall this.blocks contains objects that have a componenet and data needed to initialize that componenet
      let block = this.model.blocks[i];

      //This grabs the component
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(block.component);

      //creates the component
      let componentRef = this.viewContainerRef.createComponent(componentFactory);
      //Adds the data to the componenet
      (<Block>componentRef.instance).data = block.data;
    }

  }

  toggleToolbar() {
    this.toolbar = !this.toolbar;
  }

  insertBlock() {
    switch (this.type) {
      case 'Text':
        this.PageService.addBlock(this.BlockService.newTextBlock(this.style.width, this.PageService.blocks.length));
        break;
      case 'Image':
        this.PageService.addBlock(this.BlockService.newImageBlock(this.style.width, this.PageService.blocks.length));
        break;
      case 'Video':
        this.PageService.addBlock(this.BlockService.newVideoBlock(this.videoURL, this.PageService.blocks.length));
        break;
      case 'Spacer':
        this.PageService.addBlock(this.BlockService.newSpacerBlock(this.style.width, this.PageService.blocks.length));
        break;
    }

    this.loadComponents();
  }


  toggleLocation() {
    this.location = !this.location;
  }

  async save() {
    this.model.stub = this.model.title.replace(/\s+/g, '').toLowerCase();
    if (this.model.menu.location==='Footer') {
      this.model.menu.level = '';
      this.model.menu.shop = '';
      this.model.menu.category = '';
    }
    console.log(this.model);

    let result = await this.PageService.save(this.model);
    if (result) {
      this.SnackbarService.onSuccess();
      window.open('admin/pages/' + this.model.stub, '_self');
      //this.Router.navigateByUrl('admin/pages/' + this.model.stub);
    }
    else
      this.SnackbarService.onError();
  }



  async delete() {
    let confirmation = confirm('Are you sure? This action cannot be undone');
    if (confirmation) {
      let result = this.PageService.delete(this.model);
      if (result) {
        this.SnackbarService.onSuccess();
        window.open('admin/pages/new', '_self');
        //this.Router.navigateByUrl('admin/pages/new');
      }
      else
        this.SnackbarService.onError();
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  //                          LOCATION
  ////////////////////////////////////////////////////////////////////////////

  async getCollections() {
    return new Promise(async (resolve, reject) => {
      this.allGroups = await this.CollectionService.getAll();
      this.collections = this.allGroups.filter((collection, index, collectionArray) => {
        return collection.type === 'Collection';
      })
      console.log(this.allGroups);
      resolve(this.collections);
    })
  }

  getCategories() {
    if (!this.model.menu.shop)
      return
    console.log('GEt categories')
    let collection: string = this.model.menu.shop;
    console.log(collection);
    this.categories = this.allGroups.filter((category, index, collectionArray) => {
      return (category.type === 'Category' && category.shop === collection);
    })

    console.log(this.categories)

  }


  getSubcategories() {
    if (!this.model.menu.shop && !this.model.menu.category)
      return

    let collection: string = this.model.menu.shop;
    let category: string = this.model.menu.category;

    this.subcategories = this.allGroups.filter((subcategory, index, collectionArray) => {
      return (subcategory.type === 'Subcategory' && subcategory.category === category && subcategory.shop === collection);
    })

  }

  clearCat() {
    this.model.menu.category = undefined;
  }

  clearCol() {
    this.model.menu.shop = undefined;
    this.model.menu.category = undefined;
  }




}

