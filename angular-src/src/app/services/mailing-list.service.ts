

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subscriber, SubscriberResponse, AllSubscriberResponse } from 'src/app/models/admin/subscriber';

@Injectable({
  providedIn: 'root'
})
export class MailingListService {

  url: string = environment.baseURL + 'api/subscribers';

  constructor(private http: HttpClient) { }


  async get() {
    return new Promise<Subscriber[]>(async (resolve, reject) => {
      this.http.get(this.url).subscribe((res: AllSubscriberResponse) => {
        resolve(res.data);
      });
    })
  }

  async post(subscriber: Subscriber) {
    return new Promise<Subscriber>(async (resolve, reject) => {
      this.http.post(this.url, subscriber).subscribe((res: SubscriberResponse) => {
        console.log(res.data)
        resolve(res.data);
      });
    })
  }

  async remove(subscriber: Subscriber) {
    return new Promise<Subscriber>(async (resolve, reject) => {
      this.http.post(this.url + '/remove', subscriber).subscribe((res: SubscriberResponse) => {
        resolve(res.data);
      });
    })
  }

}