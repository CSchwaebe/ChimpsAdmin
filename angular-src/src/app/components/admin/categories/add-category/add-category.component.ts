import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { delay } from 'q';
import { Collection } from 'src/app/models/admin/collection';
import { NewCollectionService } from 'src/app/services/new-collection.service';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, AfterViewInit {
  
  formControl = new FormControl('', [Validators.required]);
  subscription: Subscription;
  isCloudinaryLoaded: boolean = false;

  
  options = ['Collection', 'Category', 'Subcategory'];
  allGroups: Collection[];
  collections: Collection[];
  categories: Collection[];
  subcategries: string[];
  
 

  image: string = '';
  //model = new Group(this.options[0], '', this.image, true);
  model = new Collection();
  



  constructor(//private CollectionService: CollectionService, 
      private CollectionService: NewCollectionService, 
              public CloudinaryService: CloudinaryService,
              private SnackbarService: SnackbarService,
              ) { 
                this.subscription = this.CloudinaryService.getImages().subscribe(imageUrl => {
                  this.image = imageUrl.replace('w_1600', 'w_405');
                });

               
              }

  ngOnInit() {
    this.getCollections();
  }

  ngAfterViewInit() {
    this.CloudinaryService.loadInit('image1');
  }

  loadCloudinary() {
    this.isCloudinaryLoaded = true;
    this.CloudinaryService.loadButtonHeaderImages('0');
  }

  clear() {
    this.model = new Collection();
    this.model.name = '';
    this.model.category = '';
    this.model.shop = '';
    this.image = '';
  }


  /**
   * Removes the Header Image 
   * 
   */
  removeImage() {
    this.image = '';
  }

  

  async onSubmit() { 
    this.model.featured = false;
    this.model.image = this.image.replace('w_405', 'w_1600');
    
    
    switch (this.model.type) {
      case 'Collection': this.model.stub = this.model.name; break;
      case 'Category': this.model.stub = this.model.shop + '/' + this.model.name; break;
      case 'Subcategory': this.model.stub = this.model.shop + '/' + this.model.category + '/' + this.model.name; break;
    }

    this.model.stub = this.model.stub.replace(/\s+/g, '').toLowerCase();
    console.log(this.model);
    
    await this.CollectionService.post(this.model);
    /*
    switch(this.model.type) {
      case 'Collection': 
        let col = { 
          name: this.model.name,
          image: this.model.image,
          stub: this.model.stub,
          active: this.model.active
        }
        await this.CollectionService.post(col);
        break;

      case 'Category': 
        let cat = { 
          name: this.model.name,
          shop: this.model.collection, 
          image: this.model.image,
          stub: this.model.stub,
          active: this.model.active
        }
        await this.CategoryService.post(cat);
        
        break;

      case 'Subcategory': 
        let sub = { 
          name: this.model.name,
          shop: this.model.collection, 
          category: this.model.category,
          image: this.model.image,
          stub: this.model.stub,
          active: this.model.active
        }
        await this.SubcategoryService.post(sub);
        break;
    }
    */

    this.SnackbarService.onSuccess();
    this.clear();
    await delay(250);
    this.getCollections();
  }

  async getCollections() {
    return new Promise(async (resolve, reject) => {
      this.allGroups = await this.CollectionService.getAll();
      this.collections = this.allGroups.filter((collection, index, collectionArray) => {
        return collection.type === 'Collection';
      })
      /*     
      for (let i = 0; i < shopArray.length; i++) {
                this.collections.push(shopArray[i].name);
            }
            */
        resolve (this.collections);
    }) 
  }

  getCategories() {
    this.categories = this.allGroups.filter((collection, index, collectionArray) => {
      return (collection.type==='Category' && collection.shop === this.model.shop);
    })
    //this.categories = await this.CollectionService.getCategories(this.model);

    /*
    return new Promise(async (resolve, reject) => {        
      this.categories = [];
      let categoryArray = await this.CategoryService.getAll(collection);
            for (let i = 0; i < categoryArray.length; i++) {
                this.categories.push(categoryArray[i].name);
            }
        resolve (this.categories);
    })
    */
  }


}
