import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from './components/preview/preview.component';
import { StyleComponent } from './style.component';
import { RouterModule, Routes } from '@angular/router';
import { ThemeComponent } from './components/theme/theme.component';
import { MaterialModule } from '../material/material/material.module'
import { ColorChromeModule } from 'ngx-color/chrome'; // <color-chrome></color-chrome>
import { HomeComponent } from './components/preview/home/home.component';
import { FooterComponent } from './components/preview/footer/footer.component';
import { NavbarComponent } from './components/preview/navbar/navbar.component';
import { HeaderComponent } from './components/preview/header/header.component';
import { ProductDetailComponent } from './components/preview/product-detail/product-detail.component';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

 
//import { HomeComponent } from './components/preview/home/home.component';


const routes: Routes = [
  { path: '', component: StyleComponent }
];


@NgModule({
  declarations: [
    PreviewComponent, 
    StyleComponent, 
    ThemeComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    ProductDetailComponent
    
  ],
  imports: [
    MaterialModule,
    ColorChromeModule,
    CommonModule,
    RouterModule.forChild(routes),
    QuillModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    PreviewComponent
  ],
  providers: [
    
  ]
})
export class StyleModule { }
