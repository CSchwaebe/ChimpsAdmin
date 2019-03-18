import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from '../../services/login.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model = new User();
  formType: boolean = true;

  constructor(private LoginService: LoginService,
              private LocalStorageService: LocalStorageService) { }

  ngOnInit() {
    console.log(this.formType)
  }

  async submitLogin() {
    console.log(this.model);
    
    let token = await this.LoginService.logIn(this.model);
    this.LocalStorageService.store('token', token);
    console.log(this.LoginService.isAuthenticated());
    
  }

  /*
  submitNewUser() {
    this.LoginService.signUp(this.model);
  }
  */

  changeForm() {
    this.formType = !this.formType;
  }

}
