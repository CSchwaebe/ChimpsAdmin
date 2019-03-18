import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/admin/order';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-orders',
  templateUrl: './search-orders.component.html',
  styleUrls: ['./search-orders.component.scss']
})
export class SearchOrdersComponent implements OnInit {

  model: Order[] = [];
   
  searchTypes: string[] = ['Email', 'Phone Number', 'Order Number'];
  selectedSearchType: string = '';
  searchString: string = '';

  constructor(public OrderService: OrderService,
              public Router: Router) {}

  async ngOnInit() {
    
  }

  async generateList() {
    this.model = await this.OrderService.getUnfulfilled();
    for (let i = 0; i < this.model.length; i++) {
      this.model[i].readableCreatedAt = new Date(this.model[i].createdAt).toLocaleString();
    }
  }

  async search() {
    this.model = await this.OrderService.search(this.selectedSearchType, this.searchString);
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

