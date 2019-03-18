import { Component, OnInit } from '@angular/core';
import { Product } from "src/app/models/admin/product";

import { ProductService } from 'src/app/services/product.service';
import { NewCollectionService } from 'src/app/services/new-collection.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Collection } from 'src/app/models/admin/collection';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.scss']
})
export class RemoveProductComponent implements OnInit {

  allGroups: Collection[];
  collections: Collection[];
  categories: Collection[];
  subcategories: Collection[];
  none: Collection = new Collection();

  products: Product[];
  model = new Product();

  constructor(private ProductService: ProductService,
    private CollectionService: NewCollectionService,

    private SnackbarService: SnackbarService,
  ) {
    this.none.name = '';
  }

  ngOnInit() {
    this.getCollections();
    //this.getProducts('bigkatoriginal', 'mens', 'sweatshirts');
  }

  clearCat() {
    this.model.category = '';
    this.model.subcategory = '';

    this.model.name = '';
    this.model.price = undefined;
    this.model.color = '';
    this.model.description = '';
  }

  clearSub() {
    this.model.subcategory = '';

    this.model.name = '';
    this.model.price = undefined;
    this.model.color = '';
    this.model.description = '';
  }


  async getCollections() {
    return new Promise(async (resolve, reject) => {
      this.allGroups = await this.CollectionService.getAll();
      this.collections = this.allGroups.filter((collection, index, collectionArray) => {
        return collection.type === 'Collection';
      })
      resolve(this.collections);
    })
  }

  getCategories() {
    let collection: string = this.model.shop;

    this.categories = this.allGroups.filter((category, index, collectionArray) => {
      return (category.type === 'Category' && category.shop === collection);
    })
    this.categories.unshift(this.none);
  }


  getSubcategories() {
    let collection: string = this.model.shop;
    let category: string = this.model.category;

    this.subcategories = this.allGroups.filter((subcategory, index, collectionArray) => {
      return (subcategory.type === 'Subcategory' && subcategory.category === category && subcategory.shop === collection);
    })
    this.subcategories.unshift(this.none);
  }


  async getProducts(collection: string, category?: string, subcategory?: string) {
    this.products = [];

    //Deals with whitespace
    let location = '/' + collection;
    if (subcategory)
      location = location + '/' + category + '/' + subcategory;
    else if (category)
      location = location + '/' + category;

    location = location.replace(/\s+/g, '').toLowerCase();

    return new Promise(async (resolve, reject) => {
      this.products = await this.ProductService.getAll(location);

      resolve(this.products);
    })

  }


  async removeProduct(index: number) {
    let prod = this.products.splice(index, 1)[0];
    prod.active = false;

    let response = await this.ProductService.update(prod);

    if (response !== null) {
      this.SnackbarService.onSuccess();
    } else {
      this.SnackbarService.onError();
    }
  }

  async deleteProduct(index: number) {
    let confirmation = confirm('Are you sure? This action cannot be undone')
    if (confirmation) {
      let prod = this.products.splice(index, 1)[0];
      prod.active = false;

      let response = await this.ProductService.delete(prod);

      if (response !== null) {
        this.SnackbarService.onSuccess();
      } else {
        this.SnackbarService.onError();
      }

    }

  }



}
