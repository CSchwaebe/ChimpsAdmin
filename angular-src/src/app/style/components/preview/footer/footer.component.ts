import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';
import { Page } from 'src/app/components/admin/pages/models/page';
import { Account } from 'src/app/models/admin/account';
import { AccountService } from 'src/app/services/account.service';
import { StyleService } from 'src/app/services/style.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  account: Account;
  pages: Page[];

  constructor(private PageService: PageService,
    private AccountService: AccountService,
    public StyleService: StyleService) { }

  async ngOnInit() {
    this.pages = [];
    let pages = await this.PageService.getAll();
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].menu.location === 'Footer')
        this.pages.push(pages[i]);
    }

    this.account = await this.AccountService.get();
  }

}
