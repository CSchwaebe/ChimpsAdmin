
import { Component, OnInit } from '@angular/core';
import { Product } from "src/app/models/admin/product";
//import { Sizes } from "../../../interfaces/product";
import { ProductService } from 'src/app/services/product.service';
import { NewCollectionService } from 'src/app/services/new-collection.service';
import { Router } from '@angular/router';
import { Collection } from 'src/app/models/admin/collection';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  allGroups: Collection[];
  collections: Collection[];
  categories: Collection[];
  subcategories: Collection[];
  
  activeProducts: Product[];
  graveyard: Product[];

  selectedShop: string = '';
  selectedCategory: string = '';
  selectedSubcategory: string = '';
  model: Product = undefined;
  submit: boolean = true;

  constructor(private ProductService: ProductService,
              private CollectionService: NewCollectionService,
              public Router: Router,
              ) { }

  ngOnInit() {
    this.getCollections();
  }


  async getCollections() {
    return new Promise(async (resolve, reject) => {
      this.allGroups = await this.CollectionService.getAll();
      this.collections = this.allGroups.filter((collection, index, collectionArray) => {
        return collection.type === 'Collection';
      })
      console.log(this.collections);
        resolve (this.collections);
    }) 
  }

  getCategories() {
    let collection: string = this.selectedShop;

    this.categories = this.allGroups.filter((category, index, collectionArray) => {
      return (category.type === 'Category' && category.shop === collection);
    })
   
  }


  getSubcategories() {
    let collection: string = this.selectedShop
    let category = this.selectedCategory;

    this.subcategories = this.allGroups.filter((subcategory, index, collectionArray) => {
      return (subcategory.type === 'Subcategory' && subcategory.category === category && subcategory.shop === collection);
    })
   
  }


  async getProducts(collection: string, category?: string, subcategory?: string) {
    this.activeProducts = [];
    this.graveyard = [];

     //Deals with whitespace
     let location = '/' + collection;
     
     if (subcategory) 
      location = location + '/' + category + '/' + subcategory;
     else if (category) 
      location = location + '/' + category;

     location = location.replace(/\s+/g, '').toLowerCase();

    return new Promise(async (resolve, reject) => {
      let productArray = await this.ProductService.getAll(location);
      
      for (let i = 0; i < productArray.length; i++) {
        if (productArray[i].active)
          this.activeProducts.push(productArray[i]);
        else 
          this.graveyard.push(productArray[i]);
      }
      //console.log(this.activeProducts);
      resolve(this.activeProducts);
    })

  }

  async activateProduct(index: number) {
    let prod = this.graveyard[index];
    prod.active = true;
    await this.ProductService.update(prod);
    await this.getProducts(this.selectedShop, this.selectedCategory, this.selectedSubcategory);

  }

  async selectProduct(index: number) {
    this.Router.navigate(['/products/edit/' + this.activeProducts[index]._id]);
  }


  clearCat() {
    this.selectedCategory = '';
    this.selectedSubcategory = '';
    if (this.model !== undefined) {
      this.model.category = '';
      this.model.subcategory = '';
    }
  }

  clearSub() {
    this.selectedSubcategory = '';
    if (this.model !== undefined) {
      this.model.subcategory = '';
    }
  }
  



}
