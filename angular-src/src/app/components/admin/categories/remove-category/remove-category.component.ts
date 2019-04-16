
import { Component, OnInit } from '@angular/core';
import { NewCollectionService } from 'src/app/services/new-collection.service';
import { Collection } from 'src/app/models/admin/collection';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ProductService } from 'src/app/services/product.service';

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
  selector: 'app-remove-category',
  templateUrl: './remove-category.component.html',
  styleUrls: ['./remove-category.component.scss']
})
export class RemoveCategoryComponent implements OnInit {
  buttonText: string = 'Show';
  showInactiveGroups: boolean = false;
  groups: Collection[] = [];

  allGroups: Collection[] = [];
  collections: Collection[] = [];
  categories: Collection[];
  subcategories: Collection[];

  sortedGroups: col[] = [];


  constructor(private CollectionService: NewCollectionService,
    private SnackbarService: SnackbarService,
    private ProductService: ProductService,
  ) { }

  async ngOnInit() {
    await this.initialize();
    console.log('On Init')
  }

  async initialize() {
    console.log(this.showInactiveGroups)
    this.sortedGroups = [];
    this.groups = await this.CollectionService.getAll();
    if (!this.showInactiveGroups) {
      this.allGroups = this.groups.filter((collection, index, collectionArray) => {
        return collection.active === true;
      })
      this.buttonText = 'Show';
    } else {
      this.allGroups = this.groups;
      this.buttonText = 'Hide';
    }

    this.sortGroups();
  }

  toggleInactiveGroups() {
    this.showInactiveGroups = !this.showInactiveGroups;
    this.initialize();
  }

  async delete(id: string) {
    let col = this.allGroups.find((collection) => {
      return collection._id === id;
    })
    let products = await this.ProductService.getAll('/' + col.stub)
    //console.log(products)
    if (products.length) {
      alert('You must remove all products from this ' + col.type + ' before you can delete it.')
      return;
    }


    let confirmation = confirm('Are you sure? This action cannot be undone');
    if (confirmation) {
      await this.CollectionService.delete(col);

      this.sortedGroups = [];
      this.SnackbarService.onSuccess();
      this.initialize();
    }
  }

  async onSubmit(id: string) {
    let col = this.allGroups.find((collection) => {
      return collection._id === id;
    })

    console.log();
    
    //Deactivate all subgroups and products
    let children = [];
    switch (col.type) {
      case 'Collection': 
      children = this.allGroups.filter((collection) => {
        return collection.shop === col.name;
      }) 
      break;
      case 'Category': 
      children = this.allGroups.filter((collection) => {
        return collection.shop === col.shop && collection.category === col.name;
      })
      break;
    }

    //console.log(children);
    for (let i = 0; i < children.length; i++) {
      children[i].active = false;
      children[i].featured = false;
      this.CollectionService.update(children[i]);
    }
       

    let products = await this.ProductService.getActive('/' + col.stub)
    //console.log(products)
    if (products) {
      for (let j = 0; j < products.length; j++) {
        products[j].active = false;
        products[j].featured = false;
        this.ProductService.update(products[j]);
      }
    }
    //END Deactivate All Subgroups and Products

    await this.CollectionService.deactivate(col);

    this.sortedGroups = [];
    this.SnackbarService.onSuccess();
    this.initialize();
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
