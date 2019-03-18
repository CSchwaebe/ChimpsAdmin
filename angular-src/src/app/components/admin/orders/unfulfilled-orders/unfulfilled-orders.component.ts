import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/admin/order';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unfulfilled-orders',
  templateUrl: './unfulfilled-orders.component.html',
  styleUrls: ['./unfulfilled-orders.component.scss']
})
export class UnfulfilledOrdersComponent implements OnInit {

  model: Order[] = [];
  
  constructor(public OrderService: OrderService,
              public Router: Router) {}

  async ngOnInit() {
    await this.generateList();
  }
  
  async generateList() {
    this.model = await this.OrderService.getUnfulfilled();
    console.log(this.model)
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

