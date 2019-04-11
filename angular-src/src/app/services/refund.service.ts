import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Order, OrderResponse, MultipleOrderResponse } from 'src/app/models/admin/order';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RefundService {

  url: string = environment.baseURL + 'api/orders/refund';

  constructor(private LoginService: LoginService,
              private http: HttpClient) { }

              
  async refund(order: Order, amount: number) {
    return new Promise<Order>(async (resolve, reject) => {
      this.http.post(this.url, {order: order, amount: amount}).subscribe((res: OrderResponse) => {
        resolve(res.data);
      });
    })
  }
/*
  async getRecent() {
    return new Promise<Order[]>(async (resolve, reject) => {
      this.http.get(this.url + 'recent').subscribe((res: MultipleOrderResponse) => {
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
  */
}
