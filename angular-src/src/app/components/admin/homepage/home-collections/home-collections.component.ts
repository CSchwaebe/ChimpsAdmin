import { Component, OnInit } from '@angular/core';
import { Home } from 'src/app/models/admin/home';
import { HomeService } from 'src/app/services/home.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { NewCollectionService } from 'src/app/services/new-collection.service';

import { Collection } from 'src/app/models/admin/collection';


interface cat {
  category: Collection;
  isOpen: boolean;
  subcategories: Collection[];
}

interface col {
  collection: Collection;
  isOpen: boolean,
  categories: cat[];
}

@Component({
  selector: 'app-home-collections',
  templateUrl: './home-collections.component.html',
  styleUrls: ['./home-collections.component.scss']
})
export class HomeCollectionsComponent implements OnInit {

  groups: Collection[] = [];
  allGroups: Collection[] = [];

  collections: Collection[] = [];
  categories: Collection[];
  subcategories: Collection[];

  sortedGroups: col[] = [];

  saveGroups: Collection[] = [];

  model: Home;



  constructor(private HomeService: HomeService,
    private SnackbarService: SnackbarService,
    private CollectionService: NewCollectionService,
  ) {

  }

  async ngOnInit() {
    let tmp = await this.HomeService.get();
    if (tmp === null) {
      this.model = new Home();
      this.model.images = [];
      this.model.featuredCollections = [];
      this.model.featuredProducts = [];
      await this.HomeService.post(this.model);
    } else {
      this.model = tmp;
      console.log(this.model);
    }
    //this.createGroups();
    await this.initialize();
  }


  async createGroups() {
    let collections: Collection[] = await this.CollectionService.getAll();

    for (let i = 0; i < collections.length; i++) {
      if (collections[i].active && collections[i].image) {
        this.allGroups.push(collections[i])
      }

    }
    this.groups = this.allGroups;

    console.log(this.allGroups)
  }



  async onSubmit() {
    this.fillModel();




    let response = this.HomeService.update(this.model);
    response ? this.SnackbarService.onSuccess() : this.SnackbarService.onError()



  }

  fillModel() {
    this.saveGroups = [];

    this.sortedGroups.forEach(col => {
      this.saveGroups.push(col.collection);
      col.categories.forEach(cat => {
        this.saveGroups.push(cat.category);
        cat.subcategories.forEach(subcategory => {
          this.saveGroups.push(subcategory);
        });
      });
    });

    console.log(this.saveGroups);
    this.model.featuredCollections = [];

    this.saveGroups.forEach(collection => {
      this.CollectionService.update(collection);
      //This is the unnecessary Part
      //if (collection.featured)
        //this.model.featuredCollections.push(collection);
        //end
    })

   
    console.log(this.model)
  }








  async initialize() {
    this.sortedGroups = [];

    this.allGroups = (await this.CollectionService.getAll()).filter((collection, index, collectionArray) => {
      return collection.active === true;
    })

    this.sortGroups();
  }



  sortGroups() {
    this.sortedGroups = [];
    this.collections = this.allGroups.filter((collection, index, collectionArray) => {
      return collection.type === 'Collection';
    })
    this.categories = this.allGroups.filter((collection, index, collectionArray) => {
      return collection.type === 'Category';
    })
    this.subcategories = this.allGroups.filter((collection, index, collectionArray) => {
      return collection.type === 'Subcategory';
    })

    for (let i = 0; i < this.collections.length; i++) {
      let col: col = {
        collection: this.collections[i],
        isOpen: false,
        categories: [],
      }
      //this.sortedGroups.push(this.collections[i])
      let categories = this.categories.filter((category, index, collectionArray) => {
        return category.shop === this.collections[i].name;
      })
      for (let j = 0; j < categories.length; j++) {
        //this.sortedGroups.push(categories[j]);
        let cat: cat = {
          category: categories[j],
          isOpen: false,
          subcategories: [],
        }
        let subcategories = this.subcategories.filter((subcategory, index, collectionArray) => {
          return (subcategory.shop === this.collections[i].name && subcategory.category === categories[j].name);
        })
        subcategories.forEach(subcategory => {
          cat.subcategories.push(subcategory);
        });
        col.categories.push(cat);
      }
      this.sortedGroups.push(col);
    }

    console.log(this.sortedGroups)
  }





  toggleCollection(col: col, id) {
    col.isOpen = !col.isOpen;

    if (col.isOpen)
      this.openCollection(id);
    else
      this.closeCollection(id);
  }

  toggleCategory(cat: cat, id) {
    cat.isOpen = !cat.isOpen;

    if (cat.isOpen)
      this.openCategory(id);
    else
      this.closeCategory(id);
  }

  private closeCollection(id: string) {
    let elements: HTMLCollectionOf<HTMLElement> = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName(id);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle('display-categories');
    }
  }

  private openCollection(id: string) {
    let elements = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName(id);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle('display-categories');
    }
  }

  private closeCategory(id: string) {
    let elements: HTMLCollectionOf<HTMLElement> = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName(id);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle('display-subcategories');
    }

  }

  private openCategory(id: string) {
    let elements = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName(id);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle('display-subcategories');
    }
  }


}

