import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Message, AllMessagesResponse, MessageResponse } from 'src/app/models/admin/message'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  url: string = environment.baseURL + 'api/messages';

  constructor(private http: HttpClient) { }


  async get() {
   
    return new Promise<Message[]>(async (resolve, reject) => {
      this.http.get(this.url).subscribe((res: AllMessagesResponse) => {
        console.log(res.data)
        resolve(res.data);
      });
    })
  }

  async getById(id: string) {
    return new Promise<Message>(async (resolve, reject) => {
      this.http.get(this.url + '/' + id).subscribe((res: MessageResponse) => {
        resolve(res.data);
      });
    })
  }

  async post(message: Message) {
    return new Promise<Message>(async (resolve, reject) => {
      console.log(message);
      this.http.post(this.url, message).subscribe((res: MessageResponse) => {
        console.log(res.data)
        resolve(res.data);
      });
    })
  }

  async update(Message: Message) {
    return new Promise<Message>(async (resolve, reject) => {
      this.http.post(this.url + '/update', Message).subscribe((res: MessageResponse) => {
        resolve(res.data);
      });
    })
  }


  async delete(Message: Message) {
    return new Promise<Message>(async (resolve, reject) => {
      this.http.post(this.url + '/delete', Message).subscribe((res: MessageResponse) => {
        resolve(res.data);
      });
    })
  }

}