import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Home, HomeResponse } from '../models/admin/home';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url: string = environment.baseURL + 'api/home/';
  constructor(private http: HttpClient) { }

  async get() {
    return new Promise<Home>(async (resolve, reject) => {
      this.http.get(this.url).subscribe((res: HomeResponse) => {
        resolve(res.data);
      });
    })
  }

  async post(home: Home) {
    return new Promise<Home>(async (resolve, reject) => {
      this.http.post(this.url, home).subscribe((res: HomeResponse) => {
        resolve(res.data);
      });
    })
  }

  async update(home: Home) {
    return new Promise<Home>(async (resolve, reject) => {
      this.http.post(this.url + 'update', home).subscribe((res: HomeResponse) => {
        resolve(res.data);
      });
    })
  }



}
