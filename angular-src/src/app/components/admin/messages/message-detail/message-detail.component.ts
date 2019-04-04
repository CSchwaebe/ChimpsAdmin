import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/admin/message';
import { MessageService } from 'src/app/services/message.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {

  message: Message;

  constructor(private Router: Router,
    private MessageService: MessageService,
    private SnackbarService: SnackbarService) { }

  async ngOnInit() {

    let id = this.Router.url.substring(16)
    console.log(id)
    this.message = await this.MessageService.getById(id);
    console.log(this.message);
  }

  async update() {
    let response = await this.MessageService.update(this.message);
    response ? this.SnackbarService.onSuccess() : this.SnackbarService.onError();
  }

}
