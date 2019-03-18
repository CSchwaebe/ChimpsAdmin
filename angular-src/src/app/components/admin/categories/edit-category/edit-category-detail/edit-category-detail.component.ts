import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/admin/product';
import { ProductService } from 'src/app/services/product.service';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { delay } from 'q';
import { NewCollectionService } from 'src/app/services/new-collection.service';
import { Collection } from 'src/app/models/admin/collection';
import { Router } from '@angular/router';



@Component({
  selector: 'app-edit-category-detail',
  templateUrl: './edit-category-detail.component.html',
  styleUrls: ['./edit-category-detail.component.scss']
})
export class EditCategoryDetailComponent implements OnInit, OnDestroy {

  isCloudinaryLoaded: boolean = false;
  subscription: Subscription;
  image: string = '';

  allGroups: Collection[] = [];
  collections: Collection[] = [];
  categories: Collection[];
  subcategories: Collection[];

  selectedType: string = '';
  selectedShop: string = '';
  selectedCategory: string = '';
  selectedSubcategory: string = '';
  stub: string = '';

  model = undefined;

  constructor(private CollectionService: NewCollectionService,
    private ProductService: ProductService,
    public CloudinaryService: CloudinaryService,
    private SnackbarService: SnackbarService,
    private Router: Router,
  ) {
    this.subscription = this.CloudinaryService.getImages().subscribe(imageUrl => {
      this.image = imageUrl.replace('w_1600', 'w_405');
    });


   
    
  }

  async ngOnInit() {
    this.getCollections();

    let id = this.Router.url.substring(23);
    
    this.model = await this.CollectionService.getById(id);
    this.initialize();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async initialize() {
    //this.model = this.allGroups[index];
    this.selectedType = this.model.type;
    switch (this.selectedType) {
      case 'Collection': 
        this.selectedShop = this.model.name;
        this.stub = this.selectedShop; 
        break;
      case 'Category': 
        this.selectedShop = this.model.shop;
        this.selectedCategory = this.model.name;
        this.stub = this.model.stub; 
        break;
      case 'Subcategory': 
        this.selectedShop = this.model.shop;
        this.selectedCategory = this.model.category;
        this.selectedSubcategory = this.model.name;
        this.stub = this.model.stub;
        this.getCategories();
      break;
    }
    this.stub = (this.stub.replace(/\s+/g, '')).toLowerCase();

    if (this.model.image) {
      this.image = this.model.image.replace('w_1600', 'w_405');
    }
    
    

    setTimeout(() => {
      this.cloudinaryInit();

      /*setTimeout(() => {
        this.loadCloudinary();
      }, 1000);
      */
    }, 500);
  }

  cloudinaryInit() {
    if (document.getElementById('image1') !== null)
      this.CloudinaryService.loadInit('image1');
    return 'Hi';
  }

  loadCloudinary() {
    this.isCloudinaryLoaded = true;
    this.CloudinaryService.loadButtonHeaderImages('0');
  }


  /**
   * Removes the Header Image 
   * 
   */
  removeImage() {
    this.image = '';
  }

  async saveChanges() {
    await delay(250);
    this.model.image = this.image.replace('w_405', 'w_1600');

    switch (this.selectedType) {
      case 'Collection': await this.saveCollection(); break;
      case 'Category': await this.saveCategory(); break;
      case 'Subcategory': await this.saveSubcategory(); break;
    }

    
    this.clear();
    this.SnackbarService.onSuccess();
    await delay(500);
    this.Router.navigate(['admin/categories/edit'])
  }

  async saveCollection() {
    this.model.stub = this.model.name.replace(/\s+/g, '').toLowerCase();

    this.updateProducts();
   
    //UPDATE CATEGORY AND SUBCATEGORIES
    let categoryArray = this.allGroups.filter((collection, index, collectionArray) => {
      return (collection.type === 'Category' && collection.shop === this.selectedShop);
    })
    //this.selectedShop;
    for (let j = 0; j < categoryArray.length; j++) {
      categoryArray[j].shop = this.model.name;
      categoryArray[j].stub = (this.model.stub + '/' + categoryArray[j].name).replace(/\s+/g, '').toLowerCase();

      let subcategoryArray = this.allGroups.filter((collection, index, collectionArray) => {
        return (collection.type === 'Subcategory' && collection.category === categoryArray[j].name && collection.shop === this.selectedShop);
      })
      for (let i = 0; i < subcategoryArray.length; i++) {
        subcategoryArray[i].shop = this.model.name;
        subcategoryArray[i].stub = (this.model.stub + '/' + categoryArray[j].name + '/' + subcategoryArray[i].name).replace(/\s+/g, '').toLowerCase();
        this.CollectionService.update(subcategoryArray[i])
      }
      this.CollectionService.update(categoryArray[j]);
    }

    //UPDATE COLLECTION / SHOP
    this.CollectionService.update(this.model);
  }

  async saveCategory() {
    console.log(this)
    
    let newStub = this.model.shop + '/' + this.model.name;
    newStub = newStub.replace(/\s+/g, '').toLowerCase();
    this.model.stub = newStub;

    this.updateProducts();
    

    //UPDATE SUBCATEGORIES
    let subcategoryArray = this.allGroups.filter((collection, index, collectionArray) => {
      return (collection.type === 'Subcategory' && collection.category==this.selectedCategory && collection.shop === this.selectedShop);
    })    
   
    for (let i = 0; i < subcategoryArray.length; i++) {
      subcategoryArray[i].shop = this.model.shop;
      subcategoryArray[i].category = this.model.name;
      subcategoryArray[i].stub = (this.model.stub + '/' + subcategoryArray[i].name).replace(/\s+/g, '').toLowerCase();
      this.CollectionService.update(subcategoryArray[i]);
    }

    //UPDATE CATEGORY
    this.CollectionService.update(this.model);
  }

  async saveSubcategory() {
    let newStub = this.model.shop + '/' + this.model.category + '/' + this.model.name;
    newStub = newStub.replace(/\s+/g, '').toLowerCase();
    this.model.stub = newStub;

    this.updateProducts();

    //UPDATE SUBCATEGORY
    this.CollectionService.update(this.model);
  }

  async updateProducts() {
   
    let tmpStub = '/' + this.stub;
    let productArray: Product[] = await this.ProductService.getAll(tmpStub);
    for (let i = 0; i < productArray.length; i++) {
      console.log('Old Product');
      console.log(productArray[i]);

      switch (this.selectedType) {
        case 'Collection':
          productArray[i].shop = this.model.name;

          break;
        case 'Category':
          productArray[i].shop = this.model.shop;
          productArray[i].category = this.model.name;
          //productArray[i].location = (this.model.stub + '/' + productArray[i].subcategory).replace(/\s+/g, '').toLowerCase();
          this.ProductService.update(productArray[i])
          break;
        case 'Subcategory':
          productArray[i].shop = this.model.shop;
          productArray[i].category = this.model.category;
          productArray[i].subcategory = this.model.name;
          //productArray[i].location = this.model.stub;
          break;
      }
      //Updates Location - Product can be in any level
      if (productArray[i].subcategory)
        productArray[i].location = (this.model.stub + '/' + productArray[i].category + '/' + productArray[i].subcategory).replace(/\s+/g, '').toLowerCase()
      else if (productArray[i].category)
        productArray[i].location = (this.model.stub + '/' + productArray[i].category).replace(/\s+/g, '').toLowerCase();
      else
        productArray[i].location = this.model.stub;


      console.log('Updated Product');
      console.log(productArray[i]);

      this.ProductService.update(productArray[i])
    }

  }


  clear() {
    this.model = null;
    this.image = '';
    this.selectedCategory = '';
    this.selectedShop = ''
    this.selectedSubcategory = '';
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

    this.categories = this.allGroups.filter((collection, index, collectionArray) => {
      return (collection.type==='Category' && collection.shop===this.model.shop);
    })

  }

}
