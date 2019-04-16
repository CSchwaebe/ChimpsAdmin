import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { delay } from 'q';
import { Collection } from 'src/app/models/admin/collection';
import { NewCollectionService } from 'src/app/services/new-collection.service';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, AfterViewInit {
  @ViewChild('addCategoryForm') form;


  formControl = new FormControl('', [Validators.required]);
  subscription: Subscription;
  isCloudinaryLoaded: boolean = false;

  
  options = ['Collection', 'Category', 'Subcategory'];
  allGroups: Collection[];
  collections: Collection[];
  categories: Collection[];
  subcategries: string[];
  
 
  image: string = '';
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
    this.form.resetForm();
  }

  isFormValid(): boolean {
    if (this.model.type === 'Collection' && this.model.name) {
      return true;
    } else if (this.model.type === 'Category' && this.model.shop && this.model.name) {
      return true;
    } else if (this.model.type === 'Subcategory' && this.model.shop && this.model.category && this.model.name) {
      return true;
    } else 
    return false;
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

    if (await this.CollectionService.get(this.model.stub)) {
      alert('You cannot add duplicate collections')
      return
    } else {
      let response = await this.CollectionService.post(this.model);
      response ? this.SnackbarService.onSuccess() : this.SnackbarService.onError();
      this.clear();
      await delay(250);
      this.getCollections();
    }
  }

  async getCollections() {
    return new Promise(async (resolve, reject) => {
      this.allGroups = await this.CollectionService.getAll();
      this.collections = this.allGroups.filter((collection, index, collectionArray) => {
        return collection.type === 'Collection';
      })
     
        resolve (this.collections);
    }) 
  }

  getCategories() {
    this.categories = this.allGroups.filter((collection, index, collectionArray) => {
      return (collection.type==='Category' && collection.shop === this.model.shop);
    })
  }


}
