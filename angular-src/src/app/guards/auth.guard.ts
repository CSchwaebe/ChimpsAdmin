import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private LoginService: LoginService,
    private Router: Router){
  }
  
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> | boolean {
    
      return new Promise<boolean>(async (resolve, reject) => {
        if (await this.LoginService.isAuthenticated()) {
          console.log('WE re in')
          resolve (true);
        }
          else {
            this.Router.navigate(['login']);
            resolve(false);
          }
      });
    
  }
}
