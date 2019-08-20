import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Collection } from 'src/app/models/admin/collection';
import { Navbar, Col, Cat } from '../../../models/navbar';
import { Subscription } from 'rxjs';
import { NavbarService } from '../../../services/navbar.service';
import { AccountService } from 'src/app/services/account.service';
import { StyleService } from 'src/app/services/style.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() parent: any;
  desktop: boolean;
  showDesktopNav: boolean;
  yOffset: number;

  selected: boolean = false;
  selectedCollection: Col;
  lastIndex: number = -1;
  allGroups: Collection[];
  model: Navbar = new Navbar();

  widthSubscription: Subscription;
  desktopNavSubscription: Subscription;
  yOffsetSubscription: Subscription;

  logo: string;

  constructor(
                  public StyleService: StyleService,
              private NavbarService: NavbarService,
              private AccountService: AccountService) {

                this.widthSubscription = this.NavbarService.getWidth().subscribe(desktop => {
                //console.log('Get Width: ' + desktop);
                this.desktop = desktop;
              });
          
              this.desktopNavSubscription = this.NavbarService.getDesktopNavbar().subscribe(status => {
                //console.log('Get Desktop Nav Status: ' + status);
                this.showDesktopNav = status;
              });

              this.yOffsetSubscription = this.NavbarService.getYOffset().subscribe(offset => {
                //console.log('Get Y Offset: ' + offset);
                this.yOffset = offset;
              });


    
            }

  async ngOnInit() {
    this.model = this.NavbarService.model;
    this.allGroups = this.NavbarService.allGroups;

    let acct = await this.AccountService.getAcct();
    console.log(acct)
    this.logo = acct.logo;
    

    this.desktop = this.NavbarService.width.getValue();
    this.showDesktopNav = this.NavbarService.desktopNavbar.getValue();
    this.show(0)
  }


  ngOnDestroy() {
    this.widthSubscription.unsubscribe();
    this.desktopNavSubscription.unsubscribe();
    this.yOffsetSubscription.unsubscribe();
  }

  show(index: number) {
    if (index === -1) {
      this.selected = false;
      this.selectedCollection = undefined;
    } else {
      this.lastIndex = index;
      this.selected = true;
      this.selectedCollection = this.model.collections[index];
    }
    
  }


  toggle(index: number) {
    if (this.lastIndex === index) {
      this.lastIndex = -1;
      this.selected = false;
      this.selectedCollection = undefined;
    } else {
      this.lastIndex = index;
      this.selected = true;
      this.selectedCollection = this.model.collections[index];
    }
    
  }








  

  

}

