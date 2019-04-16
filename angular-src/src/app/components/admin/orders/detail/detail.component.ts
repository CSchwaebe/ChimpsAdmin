import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ShippingService } from 'src/app/services/shipping.service';

import { Order } from 'src/app/models/admin/order'
import { AddressModel } from 'src/app/models/admin/address';
import { Rate, Tracking, TempShipment } from 'src/app/models/admin/shipping';
import { Big } from 'big.js'
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  selectedOrder: Order;
  displaySubtotal: number = 0;
  displayTax: number = 0;
  displayShipping: number = 0;
  displayTotal: number = 0;

  originalAddress: AddressModel;
  constructor(public OrderService: OrderService,
    private ShippingService: ShippingService,
    private Router: Router,
    private SnackbarService: SnackbarService) {
    Big.RM = 0;
  }

  async ngOnInit() {

    await this.initialize();
    

  }

  async initialize() {
    let id = this.Router.url.substring(15)

    this.selectedOrder = await this.OrderService.getById(id);
    console.log(this.selectedOrder);

    this.originalAddress = new AddressModel(this.selectedOrder.address);
    this.consructOrder();

  }


  //////////////////////////////////////////////////////
  //            Detail View
  //////////////////////////////////////////////////////
 
  async onSubmit() {
    let ret: boolean = true;
    for (let key in this.originalAddress) {
      if (this.selectedOrder.address.hasOwnProperty(key)) {
        if (this.originalAddress[key] !== this.selectedOrder.address[key]) {
          if (key === 'verify')
            continue
          console.log(key)
          console.log(this.originalAddress[key])
          console.log(this.selectedOrder.address[key])
          ret = false;
          break;
        }
      }
    }

    if (ret === false) {
      await this.updateShipping();
    } else {
      this.SnackbarService.onSuccess()
      console.log('no updates necessary');
    }
  }

  async updateStatus() {
    let response = this.OrderService.update(this.selectedOrder);
    response ? this.SnackbarService.onSuccess('Status Updated') : this.SnackbarService.onError();
  }

  async updateShipping() {
    let weight: number = 0;
    for (let i = 0; i < this.selectedOrder.products.length; i++) {
      weight += (this.selectedOrder.products[i].quantity - this.selectedOrder.products[i].quantity_refunded) * this.selectedOrder.products[i].product.weight.ounces;
    }
    console.log(this.selectedOrder.address)
    console.log(weight);
    let shipment = await this.ShippingService.createShipment(this.selectedOrder.address, weight);
    if (!shipment) {
      alert('The shipping address could not be verified. Please ensure that it is correct and try again');
      return;
    }


    console.log(this.selectedOrder.shipmentId)
    let refundStatus: string = await this.ShippingService.refundShipment(this.selectedOrder.shipmentId);
    switch (refundStatus) {
      case 'submitted':
        console.log('Submitted');
        this.SnackbarService.onSuccess('Shipping Refund Submitted');
        this.buyNewShipping(shipment);
        break;
      case 'refunded':
        console.log('Refunded');
        this.SnackbarService.onSuccess('Shipping Refunded');
        this.buyNewShipping(shipment);
        break;
      case 'rejected':
        this.SnackbarService.onError();
        console.log('Rejected');
        break;
      case 'not_applicable':
        console.log('Not Applicable');
        this.buyNewShipping(shipment);
        break;
    }

  }

  async buyNewShipping(shipment: TempShipment) {
    let rateObjects: Rate[] = shipment.rate_objects;
    rateObjects.sort((rate1, rate2) => +rate1.rate - +rate2.rate);
    let tracking: Tracking = await this.ShippingService.buyShipment(rateObjects[0]);
    this.selectedOrder.trackingUrl = tracking.public_url;
    this.selectedOrder.trackingNumber = tracking.tracking;
    this.selectedOrder.shippingLabel = tracking.shippingLabel;
    if (await this.OrderService.update(this.selectedOrder)) {
      this.SnackbarService.onSuccess('New Shipping Purchased');
      //alert('Shipping Refunded, New Shipping Purchased, Order Updated with new Shipping Label and Tracking Number. \n Return to the previous page to print the new Shipping Label.');
    };
    await this.initialize();
  }


  consructOrder() {
    this.displaySubtotal = 0;
    this.displayTax = 0;
    this.displayShipping = 0;
    this.displayTotal = 0;

    for (let i = 0; i < this.selectedOrder.products.length; i++) {
      let quantity = this.selectedOrder.products[i].quantity - this.selectedOrder.products[i].quantity_refunded;
      if (quantity > 0) {
        let s = +(new Big(this.selectedOrder.products[i].product.price).times(quantity).toFixed(2));
        this.displaySubtotal += s;
      }
    }

    this.displayTax = +(new Big(this.displaySubtotal).times(.0775).toFixed(2));
    this.displayShipping = +(this.selectedOrder.shipping - this.selectedOrder.return.refund_shipping_amount);
    this.displayTotal = +(this.displaySubtotal + this.displayTax + this.displayShipping);

  }

}
