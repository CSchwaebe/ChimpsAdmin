import { Injectable } from '@angular/core';
declare var cloudinary: any;
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  //ENVIRONMENT VARIABLE
  cloudinary_name: string = 'bigkatoriginal';

  public images: Subject<string> = new Subject<string>();
  myWidget: any = undefined;
  uploadType: string = '';


  productPreset = {
    cloudName: this.cloudinary_name,
    uploadPreset: 'product',
    resourceType: 'image',
    maxFileSize: 10000000,

    //SQUARE IMAGES
    cropping: true,
    croppingAspectRatio: 1,
    croppingDefaultSelectionRatio: .9,
    croppingShowDimensions: true,
    singleUploadAutoClose: true,
  }

  headerPreset = {
    cloudName: this.cloudinary_name,
    uploadPreset: 'header',
    resourceType: 'image',
    maxFileSize: 10000000,

    //Banner Images
    cropping: true,
    croppingAspectRatio: 3.75,
    croppingDefaultSelectionRatio: .9,
    croppingShowDimensions: true,
    singleUploadAutoClose: true,
  }

  slideshowPreset = {
    cloudName: this.cloudinary_name,
    uploadPreset: 'home169',
    resourceType: 'image',
    maxFileSize: 10000000,

    //16:9 IMAGES
    cropping: true,
    croppingAspectRatio: 1.77,
    croppingDefaultSelectionRatio: .9,
    croppingShowDimensions: true,
    singleUploadAutoClose: true,
  }

  constructor() { }

  /**
   * For Subscriptions
   */
  getImages() {
    return this.images.asObservable();
  }


  /**
   * Loads the Script
   * 
   * @param elementID 
   */
  async loadInit(elementID: string) {
    if (this.myWidget === undefined) {
      let url: string = 'https://widget.cloudinary.com/v2.0/global/all.js';
      let div = <HTMLDivElement>document.getElementById(elementID);
      let script = document.createElement('script');
      script.innerHTML = '';
      script.src = url;
      script.async = false;
      script.defer = true;
      await div.appendChild(script);
    }
  }


  /**
   * For Product Images
   * 
   * @param id 
   */
  loadButtonProductImages(id: string) {
    this.uploadType = 'product';

    if (this.myWidget !== undefined) {
      this.myWidget.update(this.productPreset, (error, result) => {
        this.callback(error, result)
      });
    } else {
      this.myWidget = cloudinary.createUploadWidget(this.productPreset, (error, result) => {
        this.callback(error, result)
      });
    }

    this.addEventListener(id);
  }

  /**
   * For Header Images (Collection, Category, Subcategory)
   * 
   * @param id 
   */
  loadButtonHeaderImages(id: string) {
    this.uploadType = 'header';

    if (this.myWidget !== undefined) {
      this.myWidget.update(this.headerPreset, (error, result) => {
        this.callback(error, result)
      });
    } else {
      this.myWidget = cloudinary.createUploadWidget(this.headerPreset, (error, result) => {
        this.callback(error, result)
      });
    }

    this.addEventListener(id);
  }

  /**
   * For Homepage Images
   * 
   * @param id 
   */
  load_HomeImages(id: string) {
    this.uploadType = 'slideshow';

    if (this.myWidget !== undefined) {
      this.myWidget.update(this.slideshowPreset, (error, result) => {
        this.callback(error, result)
      });
    } else {
      this.myWidget = cloudinary.createUploadWidget(this.slideshowPreset, (error, result) => {
        this.callback(error, result)
      });
    }

    this.addEventListener(id);
  }


  /**
   * The Callback that handles a successful upload
   * 
   */
  callback(error, result) {
    if (result && result.event === "success") {
      let url: string = 'https://res.cloudinary.com/' + this.cloudinary_name;

      if (this.uploadType === 'product') {
        url = url
          + '/image/upload/c_scale,w_768,q_60,f_auto,dpr_auto/'
          + result.info.path;
      } else if (this.uploadType === 'header') {
        url = url
          + '/image/upload/c_scale,w_1600,q_auto:best,f_auto,dpr_auto/'
          + result.info.path;
      } else if (this.uploadType === 'slideshow') {
        url = url
          + '/image/upload/c_scale,w_1600,q_auto:best,f_auto,dpr_auto/'
          + result.info.path;
      }

      this.images.next(url);
    }
  }


  /**
   * Adds an Event Listener
   * 
   * @param id 
   */
  addEventListener(id: string) {
    document.getElementById(id).addEventListener("click", () => {
      this.myWidget.open();
    }, false);
  }




}
