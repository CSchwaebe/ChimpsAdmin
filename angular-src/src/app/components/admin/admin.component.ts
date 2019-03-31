import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  /*
  category: string = 'Product';
  form: string = 'Add';
  */
  selectedComponenet: string = 'orders';
  loggedIn: boolean;

  constructor(private LoginService: LoginService) { }

  async ngOnInit() {
     this.loggedIn = await this.LoginService.isAuthenticated();
  }

/*
  setCategory(category: string) {
    this.category = category;
  }

  setForm(form: string) {
    this.form = form;
  }
  */

  chooseComponent(component: string) {
    this.selectedComponenet = component;
  }
}
