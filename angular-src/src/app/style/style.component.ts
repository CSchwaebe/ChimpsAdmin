import { Component, HostBinding, OnInit } from '@angular/core';
import { StyleService } from '../services/style.service';
import { OverlayContainer } from '@angular/cdk/overlay';


@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.scss']
})
export class StyleComponent implements OnInit {

  @HostBinding('class') componentCssClass;

  constructor(public StyleService: StyleService,
    public overlayContainer: OverlayContainer) { }

  ngOnInit() {

  }


 onSetTheme(theme) {
   if (theme) {
    this.overlayContainer.getContainerElement().classList.add('dark-theme');
    this.componentCssClass = 'dark-theme';
   } else {
    this.overlayContainer.getContainerElement().classList.add('light-theme');
    this.componentCssClass = 'light-theme';
   }
}



}
