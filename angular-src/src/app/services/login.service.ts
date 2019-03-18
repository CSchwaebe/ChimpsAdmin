import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserResponse, User, VerificationResponse } from 'src/app/models/user';
import { LocalStorageService } from 'ngx-webstorage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = environment.baseURL + 'admin/login/';
  signup: string = environment.baseURL + 'signup/';
  verify: string = environment.baseURL + 'admin/verify';
  jwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient,
              private LocalStorageService: LocalStorageService,
              ) {}

  logIn(user: User) {
    return new Promise(async (resolve, reject) => {
      this.http.post(this.url, user).subscribe((res: UserResponse) => {
        resolve(res.data);
      });
    })
  }


  async signUp(user: User) {
    return new Promise(async (resolve, reject) => {
      this.http.post(this.signup, user).subscribe((res: UserResponse) => {
        console.log(res.data);
        resolve(res.data);
      });
    })
  }

  async isAuthenticated(): Promise<boolean> {
    let token = await this.LocalStorageService.retrieve('token');
    console.log(token);
    const decoded = this.jwtHelperService.decodeToken(token);

    if (!this.jwtHelperService.isTokenExpired(token) && decoded.admin) {
      return new Promise<boolean>(async (resolve, reject) => {
        console.log(token);
        this.http.post(this.verify, {token: token}).subscribe((res: VerificationResponse) => {
          resolve(res.data);
        });
      })
    }
    else 
      return new Promise<boolean>((resolve, reject) => {
        resolve (false);
      });
    

      
  }
  
/*
  log(username: string, password: string) {
  return new Promise<Category>(async (resolve, reject) => {
    
    this.http.post(this.url, cat).subscribe((res: CategoryResponse) => {
      
      this.category = res.data;
      resolve(this.category);
    });
  })
}
*/

}
