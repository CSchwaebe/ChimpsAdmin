import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Style, StyleResponse } from 'src/app/models/admin/style';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  url: string = environment.baseURL + 'api/styles/'

  public style: Style;

  constructor(private http: HttpClient) {
    this.style = {
      theme: {
        background: 'grey',
        text: 'black',
        title: '#525252',
      },
      buttons: {
        background: '#00012e',
        text: '#fbfbfe',
      },
      footer: {
        background: '#00012e',
        text: '#fbfbfe'
      },
      /*
      menu: {
        primary_background: '#fbfbfe',
        primary_text: '#00012e',
        topnav_dropdown_background: '#00012e',
        topnav_category_text: '#bdbdbd',
        topnav_subcategory_text: '#fbfbfe',

        sidenav_secondary_background: '#f8f8fc',
        sidenav_secondary_text: '#00012e',
        sidenav_tertiary_background: '#00012e',
        sidenav_tertiary_text: '#fbfbfe',
      },
      */
      header: {
        background: '#fbfbfe',
        text: '#00012e',
      },
      dropdown_menu: {
        background: '#00012e',
        category_text: '#bdbdbd',
        subcategory_text: '#fbfbfe',
      },
      side_menu: {
        category_background: '#f8f8fc',
        category_text: '#00012e',
        subcategory_background: '#00012e',
        subcategory_text: '#fbfbfe',
      }

    }
    this.get();
  }

  async post(style: Style) {
    return new Promise<Style>(async (resolve, reject) => {
      this.http.post(this.url, style).subscribe((res: StyleResponse) => {
        if (res.data) {
          this.style = res.data;
        }
        resolve(this.style);
      });
    })
  }

  async get() {
    return new Promise<Style>(async (resolve, reject) => {
      this.http.get(this.url).subscribe((res: StyleResponse) => {
        if (res.data) {
          this.style = res.data;
        }
        resolve(this.style);
      });
    })

  }

  async update(style: Style) {
    return new Promise<Style>(async (resolve, reject) => {
      this.http.post(this.url + 'update', style).subscribe((res: StyleResponse) => {
        if (res.data) {
          this.style = res.data;
        }
        resolve(this.style);
      });
    })
  }


}
