import { Component, OnInit, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Block } from '../../types/block';
import { BlockDirective } from '../../directives/block.directive';
import { Text } from '../../models/blocks';
import { BlockService } from 'src/app/services/block.service';
import { Page } from '../../models/page';
//import { Draggable, Swappable, Sortable, sortableEvent, draggableEvent, draggableInitializedEvent } from '@shopify/draggable';
import { PageService } from 'src/app/services/page.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})

export class PageComponent implements OnInit, AfterViewInit {
  /*@Input()*/
  model: Page = {
    title: undefined,
    blocks: [],
  }

  blocks: Block[];
  viewContainerRef: ViewContainerRef;
  toolbar: boolean = false;

  //For Adding a new Block
  options: string[] = [
    'Text',
    'Image',
    'Video'
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
    public PageService: PageService
  ) { 
    this.subscription = this.PageService.isDirty().subscribe(status => {
      this.model.blocks = this.PageService.blocks;
      this.loadComponents();
    });
  }

  async ngOnInit() {
    this.viewContainerRef = this.blockDirective.viewContainerRef;



    //this.blocks = this.BlockService.getBlocks();
    this.model.title = 'Page Title';
    this.model.blocks = this.PageService.blocks;

    this.addFirstBlock();
   
    this.loadComponents();

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

addBlock() {
  //this.model.blocks.push(block);

  this.loadComponents();
  /*
  //This grabs the component
  let componentFactory = this.componentFactoryResolver.resolveComponentFactory(block.component);
  //creates the component
  let componentRef = this.viewContainerRef.createComponent(componentFactory);
  //Adds the data to the componenet
  (<Block>componentRef.instance).data = block.data;
  */

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
    this.PageService.addBlock(this.BlockService.newSpacerBlock(this.PageService.blocks.length));
      break;
  }

  this.loadComponents();
}

save() {
  console.log(this.model);
  //console.log(this.viewContainerRef);
}




}

