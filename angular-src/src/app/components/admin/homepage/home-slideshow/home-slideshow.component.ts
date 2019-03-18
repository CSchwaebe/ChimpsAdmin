import { Component, OnInit } from '@angular/core';
import { Home } from 'src/app/models/admin/home';
import { HomeService } from 'src/app/services/home.service';
import { Subscription } from 'rxjs';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-home-slideshow',
  templateUrl: './home-slideshow.component.html',
  styleUrls: ['./home-slideshow.component.scss']
})
export class HomeSlideshowComponent implements OnInit {

  subscription: Subscription;
  isCloudinaryLoaded: boolean = false;
  images = [];

  model: Home;

  constructor(private HomeService: HomeService,
    public CloudinaryService: CloudinaryService,
    private SnackbarService: SnackbarService,
    ) {
    this.subscription = this.CloudinaryService.getImages().subscribe(imageUrl => {
      this.images.push(imageUrl.replace('w_1600', 'w_405'));
    });
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
      this.images = tmp.images;
      console.log(this.model);
    }
    this.CloudinaryService.loadInit('image1'); 

  }



  loadCloudinary() {
    this.isCloudinaryLoaded = true;
    this.CloudinaryService.load_HomeImages('0');
  }


  /**
   * Removes a Product Image 
   * 
   * @param index 
   */
  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  async onSubmit() {
    this.fillModel();

   
      this.HomeService.update(this.model);
      this.SnackbarService.onSuccess();
    

  }

  fillModel() {
    this.model = new Home();
    this.model.images = [];

    for (let i = 0; i < this.images.length; i++) {
      this.model.images.push(this.images[i].replace('w_405', 'w_1600'));
    }
  }

}
