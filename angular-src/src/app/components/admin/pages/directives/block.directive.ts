import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[Block]'
})
export class BlockDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
