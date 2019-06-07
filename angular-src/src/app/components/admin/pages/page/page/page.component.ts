import { Component, OnInit, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Block } from '../../types/block';
import { BlockDirective } from '../../directives/block.directive';
import { Text } from '../../models/blocks';
import { BlockService } from 'src/app/services/block.service';
import { Page } from '../../models/page';
import { Draggable, Swappable, Sortable, sortableEvent } from '@shopify/draggable';

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
  sortable: Sortable;

  @ViewChild(BlockDirective) blockDirective: BlockDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private BlockService: BlockService,
  ) { }

  async ngOnInit() {
    this.viewContainerRef = this.blockDirective.viewContainerRef;


    //this.blocks = this.BlockService.getBlocks();
    this.model.title = 'Page Title';
    this.model.blocks = await this.BlockService.getBlocks();
    this.loadComponents();

  }

  ngAfterViewInit() {
    this.sortable = new Sortable(document.querySelectorAll('.draggable-container'), {
      draggable: '.draggable-item',
      mirror: {
        constrainDimensions: true,
      },
      delay: 100,
      handle: '.handle'
    });



    console.log(this.sortable)
    this.sortable.on('sortable:start', (sortableEvent) => {this.sortStart(sortableEvent)});
    this.sortable.on('sortable:stop', (sortableEvent) => {this.sortStop(sortableEvent)});
    


  }

  ngOnDestroy() {

  }

  sortStart(sortableEvent) {
    console.log('Start');
   //console.log(sortableEvent.startIndex);
   //startContainer
  }

  sortStop(sortableEvent) {
    console.log('Stop');
    //console.log(sortableEvent.oldIndex);
    //console.log(sortableEvent.newIndex);
   }


  loadComponents() {

    for (let i = 0; i < this.model.blocks.length; i++) {
      //Basicall this.blocks contains objects that have a componenet and data needed to initialize that componenet
      let page = this.model.blocks[i];

      //This grabs the component
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(page.component);

      //creates the component
      let componentRef = this.viewContainerRef.createComponent(componentFactory);
      //Adds the data to the componenet
      (<Block>componentRef.instance).data = page.data;
    }

  }

  toggleToolbar() {
    this.toolbar = !this.toolbar;
  }

  addBlock(page: Block) {
    
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(page.component);
    let componentRef = this.viewContainerRef.createComponent(componentFactory);
    (<Block>componentRef.instance).data = page.data;
    
  }

  insertBlock(type: string) {
    switch (type) {
      case 'Text':
        this.addBlock(this.BlockService.newTextBlock());
      case 'Image': break;
      case 'Video':
        this.addBlock(this.BlockService.newVideoBlock());
        break;
      case 'Spacer':
        this.addBlock(this.BlockService.newSpacerBlock());
        break;
    }

  }

  save() {
    console.log(this.model);
  }


}

