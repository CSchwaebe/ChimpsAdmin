import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/admin/account';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, AfterViewInit {

  model: Account = {
    name: '',
    logo: '',
    facebook: '',
    instagram: '',
    twitter: '',
  };
  subscription: Subscription;
  isCloudinaryLoaded: boolean = false;

  constructor(private CloudinaryService: CloudinaryService,
    private AccountService: AccountService,
    private SnackbarService: SnackbarService) {
    this.subscription = this.CloudinaryService.getImages().subscribe(imageUrl => {
      this.model.logo = imageUrl.replace('h_256', 'h_256');
    });

  }

  async ngOnInit() {
    let tmp = await this.AccountService.get();
    console.log(tmp)
    if (tmp) {
      this.model = tmp;
    }
  }

  ngAfterViewInit() {
    this.CloudinaryService.loadInit('image1');
  }

  loadCloudinary() {
    this.isCloudinaryLoaded = true;
    this.CloudinaryService.load_shopLogo('0');
  }

  removeImage() {
    this.model.logo = '';
  }

  async save() {
    console.log(this.model);
    let result;
    if (this.model._id) {
      result = await this.AccountService.update(this.model)
    } else {
      result = await this.AccountService.post(this.model);
    }

    result ? this.SnackbarService.onSuccess() : this.SnackbarService.onError();
    
  }
}
