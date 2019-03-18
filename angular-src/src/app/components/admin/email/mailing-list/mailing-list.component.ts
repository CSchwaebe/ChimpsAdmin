import { Component, OnInit } from '@angular/core';
import { MailingListService } from 'src/app/services/mailing-list.service';
import { Subscriber } from 'src/app/models/admin/subscriber';

@Component({
  selector: 'app-mailing-list',
  templateUrl: './mailing-list.component.html',
  styleUrls: ['./mailing-list.component.scss']
})
export class MailingListComponent implements OnInit {


  model: Subscriber[] = [];

  constructor(private MailingListService: MailingListService) { }

  async ngOnInit() {
    this.model = await this.MailingListService.get();
  }

}
