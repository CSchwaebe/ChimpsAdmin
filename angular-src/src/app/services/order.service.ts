import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Order, OrderResponse, MultipleOrderResponse } from 'src/app/models/admin/order';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url: string = environment.baseURL + 'api/orders/'
  order: Order;

  constructor(private LoginService: LoginService,
              private http: HttpClient) { }

  async post(order: Order) {
    return new Promise<Order>(async (resolve, reject) => {
      this.http.post(this.url, order).subscribe((res: OrderResponse) => {
        resolve(res.data);
      });
    })
  }

  async getRecent() {
    return new Promise<Order[]>(async (resolve, reject) => {
      this.http.get(this.url + 'recent').subscribe((res: MultipleOrderResponse) => {
        resolve(res.data);
      });
    })
  }


  async getUnfulfilled() {
    return new Promise<Order[]>(async (resolve, reject) => {
      this.http.get(this.url + 'unfulfilled').subscribe((res: MultipleOrderResponse) => {
        resolve(res.data);
      });
    })
  }

  async update(order: Order) {
    return new Promise<Order>(async (resolve, reject) => {
      this.http.post(this.url + 'update', order).subscribe((res: OrderResponse) => {
        resolve(res.data);
      });
    })
  }

  async getById(orderID: String) {
    return new Promise<Order>(async (resolve, reject) => {
      this.http.get(this.url + 'id/' + orderID).subscribe((res: OrderResponse) => {
        resolve(res.data);
      });
    })
  }

  setOrder(order: Order) {
    this.order = order;
  }

  async search(searchType: string, searchString: string) {
    
      switch(searchType) {
        case 'Email': 
          console.log('email');
          return await this.getByEmail(searchString);
        case 'Phone Number': 
        console.log('phone')
          return await this.getByPhone(searchString);
        case 'Order Number': 
          let ret: Order[] = [];
          ret.push(await this.getById(searchString));
          return ret;
      }
    
    
  }

  async getByEmail(email: string) {
    return new Promise<Order[]>(async (resolve, reject) => {
      this.http.get(this.url + 'email/' + email).subscribe((res: MultipleOrderResponse) => {
        console.log(res.data);
        resolve(res.data);
      });
    })
  }


  async getByPhone(phone: String) {
    return new Promise<Order[]>(async (resolve, reject) => {
      this.http.get(this.url + 'phone/' + phone).subscribe((res: MultipleOrderResponse) => {
        resolve(res.data);
      });
    })
  }


  
}
