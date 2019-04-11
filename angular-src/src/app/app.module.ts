import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgxPayPalModule } from 'ngx-paypal';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import * as Cloudinary from 'cloudinary-core';
import { QuillModule } from 'ngx-quill';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { CollectionService } from './services/collection.service';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ShippingService } from './services/shipping.service';
import { IterableNumberPipe } from './pipes/iterable-number.pipe';


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
    component: LoginComponent
  },
  {
    path: 'homepage/featured/collections',
    component: HomeCollectionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'homepage/featured/products',
    component: HomeProductsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'homepage/slideshow',
    component: HomeSlideshowComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/categories/add',
    component: AddCategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/categories/edit',
    component: EditCategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/categories/edit/:id',
    component: EditCategoryDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/categories/remove',
    component: RemoveCategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/products/add',
    component: AddProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/products/edit',
    component: EditProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products/edit/:id',
    component: EditProductDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/products/remove',
    component: RemoveProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/orders/recent',
    component: RecentOrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/orders/unfulfilled',
    component: UnfulfilledOrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/orders/search',
    component: SearchOrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders/detail/:id',
    component: DetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders/refund/:id',
    component: RefundComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/messages',
    component: MessageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/messages/:id',
    component: MessageDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/subscribers',
    component: MailingListComponent,
    canActivate: [AuthGuard]
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
    QuillModule,
    NgxWebstorageModule.forRoot(),
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'bigkatoriginal'}),
  ],
  providers: [
    CollectionService,
    ShippingService,
    SnackbarService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
