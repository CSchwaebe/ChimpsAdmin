import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/admin/order';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recent-orders',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.scss']
})
export class RecentOrdersComponent implements OnInit {

  model: Order[] = [];
 
  constructor(public OrderService: OrderService,
              public Router: Router) { }

  async ngOnInit() {
    await this.generateList();
  }
 
  async generateList() {
    this.model = await this.OrderService.getRecent();
    for (let i = 0; i < this.model.length; i++) {
      this.model[i].readableCreatedAt = new Date(this.model[i].createdAt).toLocaleString();
    }
  }

  async changeFulfillmentStatus(index: number) {
    this.model[index].shipped = !this.model[index].shipped;
    await this.OrderService.update(this.model[index]);
  }


  
  manageRefund(index: number) {
    this.Router.navigate(['/orders/refund/' + this.model[index]._id])
  }

  viewDetails(index: number) {
    this.Router.navigate(['/orders/detail/' + this.model[index]._id])
  }



}
