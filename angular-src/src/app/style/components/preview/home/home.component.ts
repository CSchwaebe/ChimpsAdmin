import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { HomeService } from 'src/app/services/home.service';
import { Home, Slideshow } from 'src/app/models/admin/home'
import { Product } from 'src/app/models/admin/product';
import { ProductService } from 'src/app/services/product.service';
import { CollectionService } from 'src/app/services/collection.service';
import { StyleService } from 'src/app/services/style.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  shopName: string = 'Big Kat Original'
  slideIndex: number = 1;
  activeImage: number = -1;
  slideshow: Slideshow = {
    images: []
  }

  featuredProducts: boolean = true;
  featuredProductsTitle: string = 'Featured Products';
  model: Home;

  featuredGroups: boolean = true;
  featuredGroupsTitle: string = 'Collections';

  


  constructor(private SessionStorage: SessionStorageService,
    private HomeService: HomeService,
    private ProductService: ProductService,
    private CollectionService: CollectionService,
    public StyleService: StyleService,
    ) {
    window.scrollTo(0,0);
  }


  async ngOnInit() {
   
    this.initSlideshow();
    this.model = await this.HomeService.get();
    this.getFeatured();
    console.log(this.model)
  }

  async getFeatured() {
    //console.log(await this.ProductService.getFeatured());
    //console.log(await this.CollectionService.getFeatured());
    this.model.featuredProducts = await this.ProductService.getFeatured();
    this.model.featuredCollections = await this.CollectionService.getFeatured();
  }


  async initSlideshow() {
    let tmp = this.SessionStorage.retrieve('homeSlideshow');
    if (tmp === null) {
      this.slideshow.images = (await this.HomeService.get()).images;
      this.SessionStorage.store('homeSlideshow', this.slideshow.images);
      this.autoSlideshow();
    } else {
      this.slideshow.images = tmp;
      this.autoSlideshow();
    }


  }

  autoSlideshow() {
    if (this.activeImage === this.slideshow.images.length - 1)
      this.activeImage = 0;
    else
      this.activeImage++;

    setTimeout(() => {
      this.autoSlideshow();
    }, 9000); // Change image every 9 seconds
  }

  collectionImageResize(imageURL: string) {
    return imageURL.replace('w_1600', 'w_405');
  }

  soldOut(product: Product) {
      for (let j = 0; j < product.inventory.length; j++) {
        if (product.inventory[j].quantity > 0) {
          return false;
        }
      }
      return true;

  }

}
