import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Account, AccountResponse } from 'src/app/models/admin/account';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url: string = environment.baseURL + 'api/account/';

  constructor(private http: HttpClient) { }


  async get() {
    return new Promise<Account>(async (resolve, reject) => {
      this.http.get(this.url).subscribe((res: AccountResponse) => {
        resolve(res.data);
      });
    })
  }
  
  async update(acct: Account) {
    return new Promise<Account>(async (resolve, reject) => {
      console.log(acct)
      this.http.post(this.url + 'update', acct).subscribe((res: AccountResponse) => {
        resolve(res.data);
      });
    })
  }

  async post(acct: Account) {
    return new Promise<Account>(async (resolve, reject) => {
      this.http.post(this.url, acct).subscribe((res: AccountResponse) => {
        resolve(res.data);
      });
    })
  }

}
