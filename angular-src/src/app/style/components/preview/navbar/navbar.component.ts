import { Component, OnInit, Input } from '@angular/core';

import { Collection } from 'src/app/models/admin/collection';
import { Navbar, Col, Cat } from '../../../models/navbar';
import { NavbarService } from '../../../services/navbar.service';
import { StyleService } from 'src/app/services/style.service';


@Component({
  selector: 'app-navbar-preview',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() parent: any;
  showMobileMenu: boolean = true;
  selected: number = -1;
  previousCategoryId: string = '';
  previousCollectionId: string = '';

  allGroups: Collection[];

  model: Navbar = new Navbar();

  constructor(
    public NavbarService: NavbarService,
    public StyleService: StyleService) { }

  async ngOnInit() {
    this.model = this.NavbarService.model;
    this.allGroups = this.NavbarService.allGroups;
    //await this.getData();
  }

  show(index: number) {
    this.selected = index;
  }

  toggleMobileMenu() {
    this.parent.toggleSideNav();
  }


  closeMobileMenu() {
    this.previousCategoryId = '';
    this.previousCollectionId = '';

    this.showMobileMenu = false;
  }

  expandCollectionsMobile(id) {

    //If there is an open category, close it
    if (this.previousCategoryId !== '') {
      this.closeCategoryMobile(this.previousCategoryId);
      this.previousCategoryId = '';
    }


    //If there is an open collection, close it

    if (this.previousCollectionId !== '')
      this.closeCollectionMobile(this.previousCollectionId)


    //If they double clicked the same category, dont open anything
    if (this.previousCollectionId === id) {
      this.previousCollectionId = '';
      return;
    }

    //Open the category they clicked on
    this.openCollectionMobile(id);

    //Store the newly activated category so we can use it next time
    this.previousCollectionId = id;

  }

  expandCategoriesMobile(id) {

    //If there is an open category, close it
    if (this.previousCategoryId !== '')
      this.closeCategoryMobile(this.previousCategoryId);


    //If they double clicked the same category, dont open anything
    if (this.previousCategoryId === id) {
      this.previousCategoryId = '';
      return;
    }



    //Open the category they clicked on
    this.openCategoryMobile(id);

    //Store the newly activated category so we can use it next time
    this.previousCategoryId = id;
  }

  private closeCollectionMobile(id: string) {
    let elements: HTMLCollectionOf<HTMLElement> = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName(id);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle('display-category-link');
    }
  }

  private openCollectionMobile(id: string) {
    let elements = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName(id);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle('display-category-link');
    }
  }

  private closeCategoryMobile(id: string) {
    let elements: HTMLCollectionOf<HTMLElement> = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName(id);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle('display-subcategory-link');
    }

  }

  private openCategoryMobile(id: string) {
    let elements = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName(id);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle('display-subcategory-link');
    }
  }







}
