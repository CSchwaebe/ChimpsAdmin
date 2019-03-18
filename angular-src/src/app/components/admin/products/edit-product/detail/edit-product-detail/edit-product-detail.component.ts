

import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Product, Version } from "src/app/models/admin/product";

import { ProductService } from 'src/app/services/product.service';
import { NewCollectionService } from 'src/app/services/new-collection.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Collection } from 'src/app/models/admin/collection';


export interface Size {
  name: string,
}

@Component({
  selector: 'app-edit-product-detail',
  templateUrl: './edit-product-detail.component.html',
  styleUrls: ['./edit-product-detail.component.scss']
})

export class EditProductDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  isCloudinaryLoaded: boolean = false;
  subscription: Subscription;
  model = new Product();

  //Form Groups
  infoFormGroup: FormGroup;
  inventoryFormGroup: FormGroup;
  locationFormGroup: FormGroup;

  //For location
  allGroups: Collection[] = [];
  collections: Collection[] = [];
  categories: Collection[] = [];
  subcategories: Collection[] = [];
  none: Collection = new Collection();

  //For Product Details
  weight: number;
  images = [];
  mainImage: string;

  //For Inventory
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  sizes: Size[] = [];
  inventory: Record<string, number> = {};

  //For product Preiew
  selectedSize: string;
  availableQty: number[] = [];
  previewButtonText: string = 'Load';
  preview: boolean = false;


  constructor(private ProductService: ProductService,
    private CollectionService: NewCollectionService,
    private FormBuilder: FormBuilder,
    public CloudinaryService: CloudinaryService,
    public Router: Router,
    private SnackbarService: SnackbarService

  ) {
    this.none.name = '';

    this.subscription = this.CloudinaryService.getImages().subscribe(imageUrl => {
      this.images.push(imageUrl);
    });

    this.infoFormGroup = this.FormBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      cost: ['', Validators.required],
      color: ['', Validators.required],
      weight: ['', Validators.required],

    });

    this.inventoryFormGroup = this.FormBuilder.group({

    });

    this.locationFormGroup = this.FormBuilder.group({
      collection: ['', Validators.required],
      category: ['', /*Validators.required*/],
      subcategory: ['', /*Validators.required*/]
    });


  }

  async ngOnInit() {
    let id = this.Router.url.substring(15);
    this.model = await this.ProductService.getById(id);

    console.log(this.model);

    await this.fillForms();
    await this.getCollections();
    await this.getCategories();
    await this.getSubcategories();

  }

  ngAfterViewInit() {
    this.CloudinaryService.loadInit('image1');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  ////////////////////////////////////////////////////////////////////////////
  //                          INIT
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Fills the Forms with the data from the Model - used on init
   */
  fillForms() {
    console.log(this.model)
    console.log(this.categories)
    this.locationFormGroup.get('collection').setValue(this.model.shop);
    this.locationFormGroup.get('category').setValue(this.model.category);
    this.locationFormGroup.get('subcategory').setValue(this.model.subcategory);

    this.infoFormGroup.get('name').setValue(this.model.name);
    this.infoFormGroup.get('description').setValue(this.model.description);
    this.infoFormGroup.get('price').setValue(this.model.price);
    this.infoFormGroup.get('cost').setValue(this.model.cost);
    this.infoFormGroup.get('color').setValue(this.model.color);
    this.infoFormGroup.get('weight').setValue(this.model.weight.ounces);

    for (let i = 0; i < this.model.inventory.length; i++) {
      this.sizes.push({ name: this.model.inventory[i].size });
      this.inventory[this.model.inventory[i].size] = this.model.inventory[i].quantity;
    }

    this.images = this.model.images;
    this.mainImage = this.images[0];
  }


  ////////////////////////////////////////////////////////////////////////////
  //                          SUBMIT
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Handles the update request to the db
   */
  async onSubmit() {
    this.fillModel();
    console.log(this.model);

    let response = await this.ProductService.update(this.model);
    response ? this.SnackbarService.onSuccess() : this.SnackbarService.onError();
  }

  /**
   * Fills the Model Object with the data from the Forms
   */
  fillModel() {
    //From Location Form
    if (!this.locationFormGroup.value.category) {
      this.locationFormGroup.value.subcategory = '';
    }
    this.model.shop = this.locationFormGroup.value.collection;
    this.model.category = this.locationFormGroup.value.category;
    this.model.subcategory = this.locationFormGroup.value.subcategory;

    //From info form 
    this.model.name = this.infoFormGroup.value.name.trim();
    this.model.price = this.infoFormGroup.value.price;
    this.model.cost = this.infoFormGroup.value.cost;
    this.model.color = this.infoFormGroup.value.color.trim();
    this.model.weight = { ounces: this.infoFormGroup.value.weight };
    this.model.description = this.infoFormGroup.value.description;
    this.model.images = this.images;

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


    this.model.location = (this.model.location.replace(/\s+/g, '')).toLowerCase();
    this.model.stub = (this.model.name.replace(/\s+/g, '')).toLowerCase();
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
    //this.categories = [];
    let collection: string = this.locationFormGroup.get('collection').value;

    this.categories = this.allGroups.filter((category, index, collectionArray) => {
      return (category.type === 'Category' && category.shop === collection);
    })
    this.categories.unshift(this.none);
    this.getSubcategories();

  }


  getSubcategories() {
    //this.subcategories = [];
    let collection: string = this.locationFormGroup.get('collection').value;
    let category = this.locationFormGroup.get('category').value;
    
    this.subcategories = this.allGroups.filter((subcategory, index, collectionArray) => {
      return (subcategory.type === 'Subcategory' && subcategory.category === category && subcategory.shop === collection);
    })
    this.subcategories.unshift(this.none);
    console.log(this.subcategories)

  }

}
