import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { Subscription } from 'rxjs';
import { Image, ImageBlockData } from '../../models/blocks';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  providers: [CloudinaryService],
})
export class ImageComponent implements Image, OnInit, AfterViewInit {
  @Input() data: ImageBlockData;

  showStyles: boolean = false;
  subscription: Subscription;
  isCloudinaryLoaded: boolean = false;

  constructor(public CloudinaryService: CloudinaryService,
    public PageService: PageService) {
    this.subscription = this.CloudinaryService.getImages().subscribe(imageUrl => {
      this.data.image = imageUrl.replace('w_1600', 'w_1080');
    });
   }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.CloudinaryService.loadInit('image-' + this.data.sortOrder);
  }

  loadCloudinary(id: string) {
    this.isCloudinaryLoaded = true;
    this.CloudinaryService.load_ImageBlock(id);
  }

   /**
   * Removes the Image 
   */
  removeImage() {
    this.data.image = '';
  }


  toggleStyles() {
    this.showStyles = !this.showStyles;
  }



}
