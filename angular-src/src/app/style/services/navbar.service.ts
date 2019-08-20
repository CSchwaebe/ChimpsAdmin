import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Collection } from 'src/app/models/admin/collection';
import { Navbar, Col, Cat } from '../models/navbar';
import { PageService } from 'src/app/services/page.service';
import { CollectionService } from 'src/app/services/collection.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public width: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public desktopNavbar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public yOffset: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  public model: Navbar = new Navbar();
  allGroups: Collection[];

  constructor(private CollectionService: CollectionService,
    private PageService: PageService) { 
    window.addEventListener("resize", () => {
      this.resize();
    });

    window.addEventListener("scroll", () => {
      this.calcYOffset();
    });

    this.resize();
    this.calcYOffset();
    this.getData();
  }

  
  resize() {
    if (window.innerWidth <= 1024) {
      this.width.next(false);
    } else if (window.innerWidth > 1024) {
      this.width.next(true);
    }
  }


  getWidth() {
    return this.width.asObservable();
  }

  hideDesktopNavbar() {
    this.desktopNavbar.next(false);
  }

  showDesktopNavbar() {
    this.desktopNavbar.next(true);
  }

  getDesktopNavbar() {
    return this.desktopNavbar.asObservable();
  }


  calcYOffset() {
    this.yOffset.next(window.pageYOffset);
  }

  getYOffset() {
    return this.yOffset.asObservable();
  }









  async getData() {
    this.model.collections = [];
    this.allGroups = await this.CollectionService.getAll();
    let collections: Collection[] = this.allGroups.filter((collection, index, collectionArray) => {
      return (collection.type === 'Collection' && collection.active);
    });
    let categories: Collection[] = this.allGroups.filter((collection, index, collectionArray) => {
      return (collection.type === 'Category' && collection.active);
    });
    let subcategories: Collection[] = this.allGroups.filter((collection, index, collectionArray) => {
      return (collection.type === 'Subcategory' && collection.active);
    });

    let subs: Collection[] = [];
    let cats: Cat[] = [];
    collections.forEach((collection) => {
      categories.forEach((category) => {
        if (category.shop === collection.name) {
          subcategories.forEach((subcategory) => {
            if (subcategory.shop === collection.name && subcategory.category === category.name)
              subs.push(subcategory)
          });
          cats.push({
            category: category,
            isOpen: false,
            subcategories: subs,
          })
          subs = [];
        }
      });

      this.model.collections.push({
        collection: collection,
        categories: cats,
        isOpen: false,
      })
      cats = [];
      subs = [];
    });

    await this.getPages();
    
    return
  }

  async getPages() {
    let pages = await this.PageService.getAll();
    console.log(pages)
    for (let i = 0; i < pages.length; i++) {
      let page = pages[i];

      if (page.menu.location === 'Main') {
        switch (page.menu.level) {
          case 'Collection':
            let col: Col = {
              page: page,
              isOpen: false,
              categories: null,
            }
            this.model.collections.push(col);
            break;


          case 'Category':
            let cat: Cat = {
              page: page,
              isOpen: false,
              subcategories: null,
            }

            for (let j = 0; j < this.model.collections.length; j++) {
              if (this.model.collections[j].page) {
                continue;
              }

              if (this.model.collections[j].collection.name === page.menu.shop) {
                this.model.collections[j].categories.push(cat);
                break;
              }
            }
            break;


          case 'Subcategory':
            for (let k = 0; k < this.model.collections.length; k++) {
              if (this.model.collections[k].page) {
                continue;
              }
              
               
              if (this.model.collections[k].collection.name === page.menu.shop) {
                for (let j = 0; j < this.model.collections[k].categories.length; j++) {
                  if (this.model.collections[k].categories[j].page) {
                    continue;
                  }
                  
                  if (this.model.collections[k].categories[j].category.name === page.menu.category) {
                    if (this.model.collections[k].categories[j].subcategoryPages)
                      this.model.collections[k].categories[j].subcategoryPages.push(page);
                    else {
                      this.model.collections[k].categories[j].subcategoryPages = [];
                      this.model.collections[k].categories[j].subcategoryPages.push(page);
                    }
                    break;
                  }
                }
              }
            }

            break;
        }
      }
    }

    console.log(this.model)
  }


}
