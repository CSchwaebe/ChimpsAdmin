import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collection, CollectionResponse, AllCollectionsResponse } from 'src/app/models/admin/collection';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  url: string = environment.baseURL + 'api/collections/';

  //collectionUrl: string = environment.baseURL + 'api/collection/';
  //categoryUrl: string = environment.baseURL + 'api/categories/';
  //subcategoryUrl: string = environment.baseURL + 'api/subcategories/';
  constructor(private http: HttpClient) { }


  /////////////////////////////////////////////////////////////////
  //            NEW UNIVERSAL METHODS
  /////////////////////////////////////////////////////////////////
  async get(stub: string) {
    return new Promise<Collection>(async (resolve, reject) => {
      this.http.get(this.url + stub).subscribe((res: CollectionResponse) => {
        resolve(res.data);
      });
    })
  }

  async getById(id: string) {
    return new Promise<Collection>(async (resolve, reject) => {
      this.http.get(this.url + 'id/' + id).subscribe((res: CollectionResponse) => {
        resolve(res.data);
      });
    })
  }
  
  async update(col: Collection) {
    return new Promise<Collection>(async (resolve, reject) => {
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

  async getActive(type: string) {
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

  async getInactive(type: string) {
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

 async getFeatured() {
    return new Promise<Collection[]>(async (resolve, reject) => {
      this.http.get(this.url).subscribe((res: AllCollectionsResponse) => {
        if (res.data) {
          let ret: Collection[] = [];
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].featured)
              ret.push(res.data[i]);
          }
          resolve(ret);
        } else
          resolve(res.data);
      });
    })
  }

  async deactivate(col: Collection) {
    return new Promise<Collection>(async (resolve, reject) => {
      this.http.post(this.url + 'deactivate', col).subscribe((res: CollectionResponse) => {
        resolve(res.data);
      });
    })
  }

  async delete(col: Collection) {
    return new Promise<Collection>(async (resolve, reject) => {
      this.http.post(this.url + 'delete', col).subscribe((res: CollectionResponse) => {
        resolve(res.data);
      });
    })
  }

  

}
