import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartProduct } from 'src/app/models/cartProduct'; 
import { StyleService } from 'src/app/services/style.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  title: string;
  sizes: string[] = [];
  inventory: Record<string, number> = {};
  model: CartProduct = new CartProduct();
  
  availableQty = [1];
  images: string[] = [];
  selectedImage: string = '';
 
  constructor(private router: Router,
    private ProductService: ProductService,
    private Router: Router,
    public StyleService: StyleService) {

    this.model.selectedSize = undefined;
    this.model.quantity = 1;
    this.getProduct();

  }

  async ngOnInit() {
    window.scrollTo(0,0);
   
  }

  async getProduct() {
    //this.model.product = await this.ProductService.get(this.router.url.substr(this.router.url.lastIndexOf('/') + 1));
    //this.model.product = await this.ProductService.getById(this.router.url.substr(this.router.url.lastIndexOf('-') + 1));
    this.model.product = await this.ProductService.getOne(); 
    
    for (let i = 0; i < this.model.product.inventory.length; i++) {
      if (this.model.product.inventory[i].quantity > 0) {
        this.sizes.push(this.model.product.inventory[i].size);
        this.inventory[this.model.product.inventory[i].size] = this.model.product.inventory[i].quantity;
      }
    }
   
    this.images = this.model.product.images;
    this.selectedImage = this.images[0];
  }

  /**
   * 
   * @param size 
   */
  getAvailableQty(size: string) {
    let tmp = this.inventory[size];
    this.availableQty = [];
    for (let i = 1; i <= tmp && i <= 10; i++) {
      this.availableQty.push(i);
    }
  }

  /**
   * Add to Cart
   */
  onSubmit() {
    return;
  }

  /**
   * If the user clicks 'Buy Now'
   */
  buyNow() {
    return;
    
  }

  /**
   * Changes the image
   */
  changeImage(index: number) {
    this.selectedImage = this.images[index];
  }

}
