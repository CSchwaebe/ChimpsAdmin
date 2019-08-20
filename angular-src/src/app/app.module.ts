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
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { EmbedVideo } from 'ngx-embed-video';
import { ColorChromeModule } from 'ngx-color/chrome'; // <color-chrome></color-chrome>

import { AppComponent } from './app.component';
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
import { AnalyticsComponent } from './components/admin/analytics/analytics/analytics.component';
import { VideoComponent } from './components/admin/pages/blocks/video/video.component';
import { TextComponent } from './components/admin/pages/blocks/text/text.component';
import { PageComponent } from './components/admin/pages/page/page/page.component';
import { BlockDirective } from './components/admin/pages/directives/block.directive';
import { HeaderComponent } from './components/admin-navbar/header/header/header.component';
import { ImageComponent } from './components/admin/pages/blocks/image/image.component';
import { SpacerComponent } from './components/admin/pages/blocks/spacer/spacer.component';
import { BlockService } from './services/block.service';
import { PageService } from './services/page.service';
import { AccountComponent } from './components/admin/account/account/account.component';



const appRoutes: Routes = [
  ///////////////////////////////////////////////
  //        Login
  ///////////////////////////////////////////////
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  ///////////////////////////////////////////////
  //        Home
  ///////////////////////////////////////////////
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
  ///////////////////////////////////////////////
  //        Categories
  ///////////////////////////////////////////////
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
  ///////////////////////////////////////////////
  //        Products
  ///////////////////////////////////////////////
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
  ///////////////////////////////////////////////
  //        Orders
  ///////////////////////////////////////////////
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
  ///////////////////////////////////////////////
  //        Messages
  ///////////////////////////////////////////////
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
   ///////////////////////////////////////////////
  //        Styles
  ///////////////////////////////////////////////
  {
    path: 'styles/theme',
    loadChildren: './style/style.module#StyleModule',
    canActivate: [AuthGuard]
  },
  ///////////////////////////////////////////////
  //        Pages
  ///////////////////////////////////////////////
  {
    path: 'admin/pages/:stub',
    component: PageComponent,
    canActivate: [AuthGuard]
  },
  ///////////////////////////////////////////////
  //        Analytics
  ///////////////////////////////////////////////
  {
    path: 'admin/analytics',
    component: AnalyticsComponent,
    canActivate: [AuthGuard]
  },
  ///////////////////////////////////////////////
  //        Account
  ///////////////////////////////////////////////
  {
    path: 'admin/account',
    component: AccountComponent,
    canActivate: [AuthGuard]
  },
]

@NgModule({
  declarations: [
    AppComponent,
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
    MailingListComponent,
    AnalyticsComponent,
    VideoComponent,
    TextComponent,
    PageComponent,
    BlockDirective,
    HeaderComponent,
    ImageComponent,
    SpacerComponent,
    AccountComponent,
  ],
  entryComponents: [TextComponent, VideoComponent, ImageComponent, SpacerComponent],
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
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'bigkatoriginal' }),
    NgxChartsModule,
    EmbedVideo.forRoot(),
    ColorChromeModule,
    //StyleModule,
  ],
  providers: [
    CollectionService,
    ShippingService,
    SnackbarService,
    BlockService,
    PageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
