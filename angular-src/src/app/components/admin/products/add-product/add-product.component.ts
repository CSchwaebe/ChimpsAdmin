import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Product, Version } from "src/app/models/admin/product";

import { ProductService } from 'src/app/services/product.service';
import { CollectionService } from 'src/app/services/collection.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Collection } from 'src/app/models/admin/collection';

export interface Size {
  name: string,
}

export interface Color {
  name: string,
}


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('stepper') stepper;
  isCloudinaryLoaded: boolean = false;
  subscription: Subscription;
  model = new Product();


  //Form Groups
  infoFormGroup: FormGroup;
  inventoryFormGroup: FormGroup;
  locationFormGroup: FormGroup;

  //For location
  allGroups: Collection[];
  collections: Collection[];
  categories: Collection[];
  subcategories: Collection[];

  //For Product Details
  weight: number;
  images = [];
  mainImage: string;

  //For Inventory
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  colors: Color[] = [];
  sizes: Size[] = [];
  inventory: Record<string, number> = {};

  //For product Preiew
  selectedSize: string;
  availableQty: number[] = [];
  previewButtonText: string = 'Load';
  preview: boolean = false;

  constructor(private ProductService: ProductService,
    private CollectionService: CollectionService,
    private FormBuilder: FormBuilder,
    public CloudinaryService: CloudinaryService,
    private SnackbarService: SnackbarService

  ) {
    this.subscription = this.CloudinaryService.getImages().subscribe(imageUrl => {
      console.log(imageUrl)
      this.images.push(imageUrl); //.replace('w_768', 'w_300')
    });

    this.infoFormGroup = this.FormBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      color: ['', Validators.required],
      cost: ['', Validators.required],
      weight: ['', Validators.required],
    });

    this.inventoryFormGroup = this.FormBuilder.group({

    });

    this.locationFormGroup = this.FormBuilder.group({
      collection: ['', Validators.required],
      category: ['', /*Validators.required*/],
      subcategory: ['', /*Validators.required*/]
    });

    this.getCollections();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.CloudinaryService.loadInit('image1');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  reset() {
    this.model = new Product();

    //Form Groups
    this.infoFormGroup.reset();
    this.inventoryFormGroup.reset();
    this.locationFormGroup.reset()

    //For location
    this.allGroups = [];
    this.collections = [];
    this.categories = [];
    this.subcategories = []

    //For Product Details
    this.weight = undefined;
    this.images = [];
    this.mainImage = '';

    //For Inventory

    this.sizes = [];
    this.inventory = {};

    //For product Preiew
    this.selectedSize = '';
    this.availableQty = [];
    this.previewButtonText = 'Load';
    this.preview = false;

    this.stepper.reset();
    this.getCollections();

  }


  ////////////////////////////////////////////////////////////////////////////
  //                          SUBMIT
  ////////////////////////////////////////////////////////////////////////////


  /**
   * Handles the post request to the db
   */
  async onSubmit() {
    this.fillModel();
    console.log(this.model);
    let response = await this.ProductService.post(this.model);
    response ? this.SnackbarService.onSuccess() : this.SnackbarService.onError();

    if (response) {
      this.reset();
    }
  }

  /**
   * Fills the Model Object with the data from the Forms
   */
  fillModel() {
    this.model.featured = false;
    //Need to add this to the form
    this.model.active = true;

    //From Location Form
    this.model.shop = this.locationFormGroup.value.collection;
    this.model.category = this.locationFormGroup.value.category;
    this.model.subcategory = this.locationFormGroup.value.subcategory;

    //From info form 
    this.model.name = this.infoFormGroup.value.name;
    this.model.price = this.infoFormGroup.value.price;
    this.model.cost = this.infoFormGroup.value.cost;
    this.model.color = this.infoFormGroup.value.color;
    this.model.weight = { ounces: this.infoFormGroup.value.weight };
    this.model.description = this.infoFormGroup.value.description;
    this.model.images = this.images;
    this.images.length ? this.mainImage=this.images[0] : this.mainImage='';

    //From quantity
    this.model.inventory = [];
    let sizes = Object.keys(this.inventory);
    for (let i = 0; i < sizes.length; i++) {
      let variant = { size: sizes[i], quantity: this.inventory[sizes[i]], color: this.infoFormGroup.value.color };
      this.model.inventory.push(variant);
    }

    if (this.model.subcategory)
      this.model.location = this.model.shop + '/' + this.model.category + '/' + this.model.subcategory;
    else if (this.model.category)
      this.model.location = this.model.shop + '/' + this.model.category;
    else
      this.model.location = this.model.shop;
      
    this.model.location = (this.model.location.replace(/\s+/g, '')).toLowerCase(); //tolowercase
    this.model.stub = (this.model.name.replace(/\s+/g, '')).toLowerCase(); //tolowercase

  }





  ////////////////////////////////////////////////////////////////////////////
  //                          PRODUCT INFO
  ////////////////////////////////////////////////////////////////////////////



  /**
   * Loads the cloudinary Widget - Step 2 of the 2 step process necessary to register the widget
   * Called when the user presses the Upload Button
   */
  loadCloudinary() {
    this.isCloudinaryLoaded = true;
    this.CloudinaryService.loadButtonProductImages('0');
  }

  /**
   * Removes a Product Image 
   * 
   * @param index 
   */
  removeImage(index: number) {
    this.images.splice(index, 1);
  }


  ////////////////////////////////////////////////////////////////////////////
  //                          PREVIEW
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Generates the Product Preview
   */
  generatePreview() {    
    this.fillModel();
    this.preview = true;
    this.previewButtonText = 'Refresh';
  }


  /**
   * Gets the Qty Available to populate the qty dropdown in the preview panel
   * 
   * @param size 
   */
  getAvailableQty(size: string) {
    let max = this.inventory[size];
    this.availableQty = [];
    for (let i = 1; i <= max && i <= 10; i++) {
      this.availableQty.push(i);
    }
  }


  /**
   * Handles the Drop Event of the Drag and Drop Images in Preview
   * @param event 
   */
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.mainImage = event.container.data[0];

    console.log(event.container.data);
    this.images = event.container.data;
    //console.log(event.container.data[0])
    //console.log(event.item.element.nativeElement.children['0'].currentSrc)

  }


  ////////////////////////////////////////////////////////////////////////////
  //                          INVENTORY
  ////////////////////////////////////////////////////////////////////////////


  /**
   * For adding a chip in the sizes form
   * @param event 
   */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our size
    if ((value || '').trim()) {
      this.sizes.push({ name: value.trim() });
      let key = value.trim();
      this.inventory[key] = 0;
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }


  /**
   * For adding a chip in the sizes form
   * @param event 
   */
  addColor(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our size
    if ((value || '').trim()) {
      this.colors.push({ name: value.trim() });
      //let key = value.trim();
      //this.inventory[key] = 0;
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /**
   * Removing a Chip in the Sizes Form
   * 
   * @param size 
   */
  remove(size: Size): void {
    const index = this.sizes.indexOf(size);
    delete this.inventory[size.name];
    console.log(this.inventory);
    if (index >= 0) {
      this.sizes.splice(index, 1);
    }
  }


  /**
   * Removing a Chip in the Sizes Form
   * 
   * @param size 
   */
  removeColor(color: Color): void {
    const index = this.colors.indexOf(color);
    //delete this.inventory[size.name];
    //console.log(this.inventory);
    if (index >= 0) {
      this.colors.splice(index, 1);
    }
  }


  ////////////////////////////////////////////////////////////////////////////
  //                          LOCATION
  ////////////////////////////////////////////////////////////////////////////

  async getCollections() {
    return new Promise(async (resolve, reject) => {
      this.allGroups = await this.CollectionService.getAll();
      this.collections = this.allGroups.filter((collection, index, collectionArray) => {
        return collection.type === 'Collection';
      })
      console.log(this.collections);
      resolve(this.collections);
    })
  }

  getCategories() {
    let collection: string = this.locationFormGroup.get('collection').value;

    this.categories = this.allGroups.filter((category, index, collectionArray) => {
      return (category.type === 'Category' && category.shop === collection);
    })

  }


  getSubcategories() {
    let collection: string = this.locationFormGroup.get('collection').value;
    let category = this.locationFormGroup.get('category').value;

    this.subcategories = this.allGroups.filter((subcategory, index, collectionArray) => {
      return (subcategory.type === 'Subcategory' && subcategory.category === category && subcategory.shop === collection);
    })

  }

}
