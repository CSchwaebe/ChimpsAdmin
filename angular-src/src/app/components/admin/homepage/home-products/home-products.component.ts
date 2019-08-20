import { Component, OnInit } from '@angular/core';
import { Home } from 'src/app/models/admin/home';
import { HomeService } from 'src/app/services/home.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

import { Product } from 'src/app/models/admin/product';
import { ProductService } from 'src/app/services/product.service';
import { Collection } from 'src/app/models/admin/collection';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit {

  
  allGroups: Collection[] = [];
  groups: Collection[] = [];
  collections: Collection[] = [];
  categories: Collection[] = [];
  subcategories: Collection[] = [];
  none: Collection = new Collection();

  model: Home;
  init: boolean = false;


  products: Product[] = [];
  displayProductFilter: boolean = false;
  filteredProducts: Product[];// = [];
  productFilter = {
    collection: '',
    category: '', 
    subcategory: ''
  }

  constructor(private HomeService: HomeService,
    private SnackbarService: SnackbarService,
    private ProductService: ProductService,
    private CollectionService: CollectionService,
  ) {
    this.none.name = '';    
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
    }

    this.getCollections();
    this.products = await this.ProductService.getAllActive();
    this.filterProducts();
  }


  async updateProduct(prod: Product) {   
    await this.ProductService.update(prod);
    let response = await this.HomeService.update(this.model);
    response ? this.SnackbarService.onSuccess() : this.SnackbarService.onError();
  }


  filterProducts() {
    if (!this.productFilter.collection) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter((product, index, products) => {
        if (this.productFilter.subcategory) {
          return product.subcategory === this.productFilter.subcategory;
        } else if (this.productFilter.category) {
          return product.category === this.productFilter.category;
        } else {
          return product.shop === this.productFilter.collection;
        }
      })
    }
    this.filteredProducts = this.filteredProducts.sort((a,b) => {
      return (+b.featured - +a.featured);
    })
  }

  clearCat() {
    this.productFilter.category = '';
    this.productFilter.subcategory = '';
  }

  clearSub() {
    this.productFilter.subcategory = '';
  }

  async getCollections() {
    return new Promise(async (resolve, reject) => {
      this.allGroups = await this.CollectionService.getAll();
      this.collections = this.allGroups.filter((collection, index, collectionArray) => {
        return collection.type === 'Collection' && collection.active;
      })
      resolve(this.collections);
    })
  }

  getCategories() {
    let collection: string = this.productFilter.collection;

    this.categories = this.allGroups.filter((category, index, collectionArray) => {
      return (category.type === 'Category' && category.shop === collection);
    })
    this.categories.unshift(this.none);
    this.getSubcategories();
  }


  getSubcategories() {
    let collection: string = this.productFilter.collection;
    let category: string = this.productFilter.category;
    
    this.subcategories = this.allGroups.filter((subcategory, index, collectionArray) => {
      return (subcategory.type === 'Subcategory' && subcategory.category === category && subcategory.shop === collection);
    })
    this.subcategories.unshift(this.none);
  }


}
