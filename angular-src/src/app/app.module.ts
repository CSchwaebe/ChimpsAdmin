import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgxPayPalModule } from 'ngx-paypal';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import * as Cloudinary from 'cloudinary-core';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { CollectionService } from './services/collection.service';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ShippingService } from './services/shipping.service';
import { IterableNumberPipe } from './pipes/iterable-number.pipe';


import { AdminComponent } from './components/admin/admin.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';

import { AddProductComponent } from './components/admin/products/add-product/add-product.component';
import { RemoveProductComponent } from './components/admin/products/remove-product/remove-product.component';
import { EditProductComponent } from './components/admin/products/edit-product/edit-product.component';
import { EditProductDetailComponent } from './components/admin/products/edit-product/detail/edit-product-detail/edit-product-detail.component';

import { AddCategoryComponent } from './components/admin/categories/add-category/add-category.component';
import { RemoveCategoryComponent } from './components/admin/categories/remove-category/remove-category.component';
import { EditCategoryComponent } from './components/admin/categories/edit-category/edit-category.component';

import { RecentOrdersComponent } from './components/admin/orders/recent-orders/recent-orders.component';
import { UnfulfilledOrdersComponent } from './components/admin/orders/unfulfilled-orders/unfulfilled-orders.component';
import { SearchOrdersComponent } from './components/admin/orders/search-orders/search-orders.component';
import { RefundComponent } from './components/admin/orders/refund/refund.component';
import { DetailComponent } from './components/admin/orders/detail/detail.component';

import { MaterialModule } from './material/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackbarService } from './services/snackbar.service';
import { Collection } from './models/admin/collection';
import { EditCategoryDetailComponent } from './components/admin/categories/edit-category/edit-category-detail/edit-category-detail.component';
import { HomeSlideshowComponent } from './components/admin/homepage/home-slideshow/home-slideshow.component';
import { HomeCollectionsComponent } from './components/admin/homepage/home-collections/home-collections.component';
import { HomeProductsComponent } from './components/admin/homepage/home-products/home-products.component';
import { MessageComponent } from './components/admin/messages/message/message.component';
import { MessageDetailComponent } from './components/admin/messages/message-detail/message-detail.component';
import { MailingListComponent } from './components/admin/email/mailing-list/mailing-list.component';



const appRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'homepage/featured/collections',
    component: HomeCollectionsComponent,
  },
  {
    path: 'homepage/featured/products',
    component: HomeProductsComponent,
  },
  {
    path: 'homepage/slideshow',
    component: HomeSlideshowComponent,
  },
  {
    path: 'admin/categories/add',
    component: AddCategoryComponent,
  },
  {
    path: 'admin/categories/edit',
    component: EditCategoryComponent,
  },
  {
    path: 'admin/categories/edit/:id',
    component: EditCategoryDetailComponent,
  },
  {
    path: 'admin/categories/remove',
    component: RemoveCategoryComponent,
  },
  {
    path: 'admin/products/add',
    component: AddProductComponent,
  },
  {
    path: 'admin/products/edit',
    component: EditProductComponent,
  },
  {
    path: 'products/edit/:id',
    component: EditProductDetailComponent,
  },
  {
    path: 'admin/products/remove',
    component: RemoveProductComponent,
  },
  {
    path: 'admin/orders/recent',
    component: RecentOrdersComponent,
  },
  {
    path: 'admin/orders/unfulfilled',
    component: UnfulfilledOrdersComponent,
  },
  {
    path: 'admin/orders/search',
    component: SearchOrdersComponent,
  },
  {
    path: 'orders/detail/:id',
    component: DetailComponent,
  },
  {
    path: 'orders/refund/:id',
    component: RefundComponent,
  },
  {
    path: 'admin/messages',
    component: MessageComponent,
  },
  {
    path: 'admin/messages/:id',
    component: MessageDetailComponent,
  },
  {
    path: 'admin/subscribers',
    component: MailingListComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  
  
]

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    RecentOrdersComponent,
    RefundComponent,
    AdminComponent,
    AddProductComponent,
    AddCategoryComponent,
    RemoveCategoryComponent,
    EditCategoryComponent,
    EditProductComponent,
    RemoveProductComponent,
    IterableNumberPipe,
    AdminNavbarComponent,
    IterableNumberPipe,
    DetailComponent,
    UnfulfilledOrdersComponent,
    SearchOrdersComponent,
    EditProductDetailComponent,
    EditCategoryDetailComponent,
    HomeSlideshowComponent,
    HomeCollectionsComponent,
    HomeProductsComponent,
    MessageComponent,
    MessageDetailComponent,
    MailingListComponent
  ],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgxPayPalModule,
    NgxWebstorageModule.forRoot(),
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'bigkatoriginal'}),
  ],
  providers: [
    CollectionService,
    ShippingService,
    SnackbarService,
    Collection
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
