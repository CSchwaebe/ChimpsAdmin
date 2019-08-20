import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Product, ProductResponse, AllProductResponse } from 'src/app/models/admin/product';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  async post(prod: Product) {
    return new Promise<Product>(async (resolve, reject) => {
      this.http.post(this.url + 'api/products', prod).subscribe((res: ProductResponse) => {
        resolve(res.data);
      });
    })
  }

  async getAll(location: string) {
    return new Promise<Product[]>(async (resolve, reject) => {
      console.log(this.url.slice(0, -1) + location);
      this.http.get(this.url.slice(0, -1) + location).subscribe((res: AllProductResponse) => {
        resolve(res.data);    
      });
    })
  }

  async getActive(location: string) {
    return new Promise<Product[]>(async (resolve, reject) => {
      console.log(this.url + 'api/products/active' + location);
      this.http.get(this.url + 'api/products/active' + location).subscribe((res: AllProductResponse) => {
        resolve(res.data);    
      });
    })
  }


  async getAllActive() {
    return new Promise<Product[]>(async (resolve, reject) => {
      this.http.get(this.url + 'api/products/active').subscribe((res: AllProductResponse) => {
        resolve(res.data);    
      });
    })
  }

  async get(stub: string) {
    return new Promise<Product>(async (resolve, reject) => {
      this.http.get(this.url + 'api/products/' + stub).subscribe((res: ProductResponse) => {
        resolve(res.data);
      });
    })
  }

  async getById(id: string) {
    return new Promise<Product>(async (resolve, reject) => {
      this.http.get(this.url + 'api/products/id/' + id).subscribe((res: ProductResponse) => {
        resolve(res.data);
      });
    })
  }

  async getOne() {
    return new Promise<Product>(async (resolve, reject) => {
      this.http.get(this.url + 'api/products').subscribe((res: ProductResponse) => {
        resolve(res.data);
      });
    })
  }

  async update(prod: Product) {
    console.log('Updating Product')
    console.log(prod);
    return new Promise<Product>(async (resolve, reject) => {
      this.http.post(this.url + 'api/products/update', prod).subscribe((res: ProductResponse) => {
        resolve(res.data);
      });
    })
  }

  async delete(prod: Product) {
    return new Promise<Product>(async (resolve, reject) => {
      this.http.post(this.url + 'api/products/delete', prod).subscribe((res: ProductResponse) => {
        resolve(res.data);
      });
    })
  }

  async getFeatured() {
    return new Promise<Product[]>(async (resolve, reject) => {
      this.http.get(this.url + 'api/products/featured').subscribe((res: AllProductResponse) => {
        resolve(res.data);    
      });
    })
  }

  
  async restock(id: string, size: string, quantity: number) {
      let obj = { 
        id: id,
        size: size,
        quantity: quantity
      }
      return new Promise<Product>(async (resolve, reject) => {
        this.http.post(this.url + 'api/products/restock', obj).subscribe((res: ProductResponse) => {
          resolve(res.data);
        });
      })
      
      /*
      let xhr = new XMLHttpRequest();
      xhr.open("POST", this.url + 'api/products/putback', false);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(obj));
      */
    }
    

}
