import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/admin/order';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { LoadingScreenService } from 'src/app/services/loading-screen.service';
import { ShippingService } from 'src/app/services/shipping.service';
import { Tracking } from 'src/app/models/admin/shipping';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-unfulfilled-orders',
  templateUrl: './unfulfilled-orders.component.html',
  styleUrls: ['./unfulfilled-orders.component.scss']
})
export class UnfulfilledOrdersComponent implements OnInit {
  loading: boolean = false;
  loadingSubscription: Subscription;
  model: Order[] = [];
  
  constructor(public OrderService: OrderService,
    public LoadingScreenService: LoadingScreenService,
    public ShippingService: ShippingService,
    private SnackbarService: SnackbarService,
              public Router: Router) {}

  async ngOnInit() {
    await this.generateList();

    this.loadingSubscription = this.LoadingScreenService.getLoading().subscribe(isLoading => {
      this.loading = isLoading;
    });
  }
  
  async generateList() {
    this.model = await this.OrderService.getUnfulfilled();
    console.log(this.model)
    for (let i = 0; i < this.model.length; i++) {
      this.model[i].readableCreatedAt = new Date(this.model[i].createdAt).toLocaleString();
    }

    this.model = this.model.sort((a,b) => {
      return +new Date(b.createdAt) - +new Date(a.createdAt);
    })
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


  /**
   * Buys shipping if it hasnt been purchased already
   */
  async buyShipping(index: number) {
    this.LoadingScreenService.on();
    let order = this.model[index];
    if (order.trackingUrl) {
      this.LoadingScreenService.off();
      return;
    }
    else {
      let tracking: Tracking = await this.ShippingService.buyShipment(this.model[index].shippingRate);
      console.log(tracking);
      if (!tracking) {
        this.LoadingScreenService.off();
        this.SnackbarService.onError();
        return;
      }
      order.trackingUrl = tracking.public_url;
      order.trackingNumber = tracking.tracking;
      order.shippingLabel = tracking.shippingLabel;
      //await this.OrderService.update(order);
      this.model[index] = await this.OrderService.update(order);//this.OrderService.getById(order._id);
      this.model[index].readableCreatedAt = new Date(this.model[index].createdAt).toLocaleString();

      //this.generateList();
      this.LoadingScreenService.off();
    }
  }




}

