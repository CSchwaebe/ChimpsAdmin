import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/app/models/admin/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private MessageService: MessageService,
    public Router: Router) { }

  model: Message[] = [];
 

  async ngOnInit() {
    await this.generateList();
  }
 
  async generateList() {
    this.model = await this.MessageService.get();    
    
    for (let i = 0; i < this.model.length; i++) {
      this.model[i].readableCreatedAt = new Date(this.model[i].createdAt).toLocaleString();
    }
    
    this.model.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return +new Date(b.createdAt) - +new Date(a.createdAt);
    });
    
  }

  async changeStatus(index: number) {
    this.model[index].status = !this.model[index].status;
    await this.MessageService.update(this.model[index]);
  }


  viewDetails(index: number) {
    this.Router.navigate(['admin/messages/' + this.model[index]._id])
  }

  async delete(index: number) {
    let confirmation = confirm('Are you sure? This action cannot be undone');
    
    if (confirmation) { 
      await this.MessageService.delete(this.model[index]);
      this.generateList();
    }

  }



}
