import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { StyleService } from 'src/app/services/style.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

title = 'angular-src';
open = false;
desktop: boolean = true;
hamburger: any;
selected: string = 'home';

@ViewChild('sidenav') sidenav;
@ViewChild('app-navbar') navbar;

constructor(private NavbarService: NavbarService, 
  public StyleService: StyleService) {
}

async ngOnInit() {
  await this.StyleService.get();
}



ngAfterViewInit() {
  // Look for .hamburger
  this.hamburger = document.querySelector(".hamburger-helper");
  // On click
  /*
  this.hamburger.addEventListener("click", () => {
    // Toggle class "is-active"
    this.hamburger.classList.toggle("is-active");
    // Do something else, like open/close menu
    this.toggleSideNav();
  });
  */
  
}

select(component: string) {
  this.selected = component;
}

toggleSideNav() {
  return;
  this.sidenav.toggle();
  this.hamburger.classList.toggle("is-active");
  this.open = !this.open;
  console.log('Toggle Sidenav')
  
  if (this.open) {
    this.NavbarService.hideDesktopNavbar();
  } else {
    this.NavbarService.showDesktopNavbar();
  }
  
}
}
