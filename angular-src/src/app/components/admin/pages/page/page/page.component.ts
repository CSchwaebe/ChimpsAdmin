import { Component, OnInit, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Block } from '../../types/block';
import { BlockDirective } from '../../directives/block.directive';
import { Text } from '../../models/blocks';
import { BlockService } from 'src/app/services/block.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  /*@Input()*/
  blocks: Block[];
  viewContainerRef: ViewContainerRef;

  @ViewChild(BlockDirective) blockDirective: BlockDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private BlockService: BlockService) { }

  ngOnInit() {
    this.viewContainerRef = this.blockDirective.viewContainerRef;

    this.blocks = this.BlockService.getBlocks();
    this.loadComponents();
  }

  ngOnDestroy() {

  }

  loadComponents() {
    
    for (let i = 0; i < this.blocks.length; i++) {
      //Basicall this.blocks contains objects that have a componenet and data needed to initialize that componenet
      
      let page = this.blocks[i];

      //This grabs the component
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(page.component);
     
      //creates the component
      let componentRef = this.viewContainerRef.createComponent(componentFactory);
      //Adds the data to the componenet
      (<Block>componentRef.instance).data = page.data;
    }

  }

  getAds() {

  }

}

