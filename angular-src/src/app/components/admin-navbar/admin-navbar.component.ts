import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';
import { Page } from '../admin/pages/models/page';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {
  pages: Page[];

  constructor(private PageService: PageService) { }

  async ngOnInit() {
    this.pages = await this.PageService.getAll();
    console.log(this.pages)
    }

  showDropContent(id) {
    let elements: HTMLCollectionOf<HTMLElement> = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName(id);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle('drop-content');
      elements[i].classList.toggle('links-container');
    }
  }


}




