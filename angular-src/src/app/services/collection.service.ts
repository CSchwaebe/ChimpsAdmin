import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collection, CollectionResponse, AllCollectionsResponse } from 'src/app/models/admin/collection';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  url: string = environment.baseURL + 'api/collection/';

  constructor(private http: HttpClient) { }

  
  async get(stub: string) {
    return new Promise<Collection>(async (resolve, reject) => {
      this.http.get(this.url + stub).subscribe((res: CollectionResponse) => {
        resolve(res.data);
      });
    })
  }
  
  async update(col: Collection) {
    return new Promise<Collection>(async (resolve, reject) => {
      console.log(col)
      this.http.post(this.url + 'update', col).subscribe((res: CollectionResponse) => {
        resolve(res.data);
      });
    })
  }

  async post(col: Collection) {
    return new Promise<Collection>(async (resolve, reject) => {
      this.http.post(this.url, col).subscribe((res: CollectionResponse) => {
        resolve(res.data);
      });
    })
  }

  async getAll() {
    return new Promise<Collection[]>(async (resolve, reject) => {
      this.http.get(this.url).subscribe((res: AllCollectionsResponse) => {
        resolve(res.data);
      });
    })
  }

  async getActive() {
    return new Promise<Collection[]>(async (resolve, reject) => {
      this.http.get(this.url).subscribe((res: AllCollectionsResponse) => {
        if (res.data != null) {
          let ret: Collection[] = [];
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].active)
              ret.push(res.data[i]);
          }
          resolve(ret);
        } else
          resolve(res.data);
      });
    })
  }

  async getInactive() {
    return new Promise<Collection[]>(async (resolve, reject) => {
      this.http.get(this.url).subscribe((res: AllCollectionsResponse) => {
        if (res.data != null) {
          let ret: Collection[] = [];
          for (let i = 0; i < res.data.length; i++) {
            if (!res.data[i].active)
              ret.push(res.data[i]);
          }
          resolve(ret);
        } else
          resolve(res.data);
      });
    })
  }

  async deactivate(col: Collection) {
    //console.log(col);
    return new Promise<Collection>(async (resolve, reject) => {
      this.http.post(this.url + 'deactivate', col).subscribe((res: CollectionResponse) => {
        //console.log(res.data);
        resolve(res.data);
      });
    })
  }

  /*
  async deactivate(col: Collection) {
    return new Promise<Collection>(async (resolve, reject) => {
      this.http.delete(this.url + col.name).subscribe((res: CollectionResponse) => {
        resolve(res.data);
      });
    })
  }
*/




}



