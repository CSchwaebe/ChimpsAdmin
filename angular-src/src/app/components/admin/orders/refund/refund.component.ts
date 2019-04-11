import { Component, OnInit } from '@angular/core';
import { Order, Return } from 'src/app/models/admin/order';
import { CartProduct } from 'src/app/models/cartProduct';
import { OrderService } from 'src/app/services/order.service';
import { RefundService } from 'src/app/services/refund.service';
import { Big } from 'big.js';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})

export class RefundComponent implements OnInit {

  selectedOrder: Order;
  refundTypes: String[] = ['None', 'Partial', 'Full'];

  //For the New Refund
  refund_subtotal: number = 0;
  refund_tax: number = 0;
  refund_total: number = 0;
  refund_shipping: number = 0;
  tmpShippingAmount: number = 0;

  //For Previous Refunds
  previousRefund: CartProduct[];
  newRefund: CartProduct[];
  previousRefundSubtotal: number = 0;
  previousRefundTax: number = 0;
  previousRefundShipping: number = 0;
  previousRefundTotal: number = 0;

  //For the Buttons and Displays
  showPreviousRefunds: boolean = false;
  previousButtonText: string = 'View';
  showOriginalOrder: boolean = false;
  originalButtonText: string = 'View';


  constructor(private OrderService: OrderService,
    public RefundService: RefundService,
    public Router: Router,
    private SnackbarService: SnackbarService,
    private ProductService: ProductService) {
    //Rounding Mode (Down) and Decimal Places (2)
    Big.RM = 0;
    Big.DP = 2;
  }

  async ngOnInit() {
   this.initialize();
  }

  async initialize() {
    let id = this.Router.url.substring(15);
    this.selectedOrder = await this.OrderService.getById(id);

    this.previousRefund = [];
    this.newRefund = [];
    //For the New Refund
  this.refund_subtotal = 0;
  this.refund_tax = 0;
  this.refund_total = 0;
  this.refund_shipping = 0;
  this.tmpShippingAmount = 0;

  //For Previous Refunds
  
  this.previousRefundSubtotal = 0;
  this.previousRefundTax = 0;
  this.previousRefundShipping = 0;
  this.previousRefundTotal = 0;
    this.checkForPreviousRefund();
    this.calcRefundSubtotal();
  }

  checkForPreviousRefund() {
    for (let i = 0; i < this.selectedOrder.products.length; i++) {
      if (this.selectedOrder.products[i].quantity_refunded > 0) {
        //FOR THE PREVIOUS REFUND
        let prodCopy = new CartProduct(this.selectedOrder.products[i].product, this.selectedOrder.products[i].selectedSize, this.selectedOrder.products[i].quantity)
        prodCopy.quantity_refunded = this.selectedOrder.products[i].quantity_refunded;
        prodCopy.quantity_restocked = this.selectedOrder.products[i].quantity_restocked;
        prodCopy.quantity_available_refund = this.selectedOrder.products[i].quantity_available_refund;
        prodCopy.quantity_available_restock = this.selectedOrder.products[i].quantity_available_restock;
        this.previousRefund.push(prodCopy);
      }
      //FOR THE NEW REFUND
        let prodCopy2 = new CartProduct(this.selectedOrder.products[i].product, this.selectedOrder.products[i].selectedSize, this.selectedOrder.products[i].quantity)
        prodCopy2.quantity_refunded = 0;
        prodCopy2.quantity_restocked = 0;
        prodCopy2.quantity_available_refund = this.selectedOrder.products[i].quantity_available_refund;
        prodCopy2.quantity_available_restock = this.selectedOrder.products[i].quantity_available_restock;
        this.newRefund.push(prodCopy2);
      
    }
    if (this.previousRefund.length) {
      this.previousRefundTotal = +this.selectedOrder.return.refund_amount;
      this.previousRefundShipping = +this.selectedOrder.return.refund_shipping_amount;
      for (let i = 0; i < this.previousRefund.length; i++) {
        let tmp_sub = new Big(this.previousRefund[i].product.price).times(this.previousRefund[i].quantity_refunded).plus(this.previousRefundSubtotal);
        this.previousRefundSubtotal = +tmp_sub.toFixed(2);
      }
      //let tmp_tax = new Big(this.previousRefundSubtotal).times(+this.selectedOrder.taxRate);
      //this.previousRefundTax = +tmp_tax.toFixed(2);
      this.previousRefundTax = +this.selectedOrder.return.refund_tax;
    }

    console.log(this.previousRefund)
    console.log(this.previousRefundTotal)

  }

  calcRefundSubtotal() {
    console.log('calcRefundSubtotal')
    this.refund_subtotal = 0;
    console.log(this.selectedOrder.products)
    console.log(this.newRefund)
   // for (let i = 0; i < this.selectedOrder.products.length; i++) {
    for (let i = 0; i < this.newRefund.length; i++) {
      if (this.newRefund[i].quantity_refunded > 0) {
        let tmp = new Big(this.newRefund[i].quantity_refunded).times(this.newRefund[i].product.price).plus(this.refund_subtotal);
        this.refund_subtotal = +tmp.toFixed(2);
        console.log(this.refund_subtotal)
      }
    }
    this.calcRefundTax();
    this.calcRefundTotal();
  }
  /**
   * Calculates the Amount of Tax to refund
   * 
   */
  calcRefundTax() {
    let tmp = new Big(this.refund_subtotal).times(+this.selectedOrder.taxRate);
    this.refund_tax = +tmp.toFixed(2);
    console.log(this.refund_tax);
  }

  calcRefundTotal() {
    this.fixShippingInput();

    let tmp = new Big(this.refund_subtotal).plus(this.refund_tax).plus(this.refund_shipping);
    this.refund_total = +tmp.toFixed(2);
  }

  async onSubmit() {
    let tmp = new Big(this.refund_total).plus(this.previousRefundTotal)
    let totalRefunded = +tmp.toFixed(2);
    console.log(totalRefunded)
    if (this.isFullRefund())
      this.ensureCorrectTax();
    if (!this.checkTotalRefunded(totalRefunded))
      return;
    if (!this.setRefundType(totalRefunded))
      return;
    if (!this.checkRefundShippingAmount())
      return;

    this.selectedOrder.return.return_initiated = true;
    this.selectedOrder.return.return_received = true;

    console.log(this.selectedOrder);

    this.confirmRefund();

  }

  clearRestock(index: number) {
    if (this.newRefund[index].quantity_restocked > this.newRefund[index].quantity_refunded)
      this.newRefund[index].quantity_restocked = 0;
  }

  viewPreviousRefunds() {
    this.showPreviousRefunds = !this.showPreviousRefunds;
    if (this.showPreviousRefunds)
      this.previousButtonText = 'Hide';
    else
      this.previousButtonText = 'View';
  }

  viewOriginalOrder() {
    this.showOriginalOrder = !this.showOriginalOrder;
    if (this.showOriginalOrder)
      this.originalButtonText = 'Hide';
    else
      this.originalButtonText = 'View';
  }

  isFullRefund() {
    //console.log(this.newRefund);
    //console.log(this.selectedOrder.products)
    for (let i = 0; i < this.selectedOrder.products.length; i++) {
      if (+this.newRefund[i].quantity_refunded !== this.selectedOrder.products[i].quantity_available_refund) {
        return false;
      }
    }
    return true;
  }

  ensureCorrectTax() {
    let tmp = new Big(+this.selectedOrder.tax).minus(this.previousRefundTax).minus(this.refund_tax);
    if (tmp.cmp(0) === 0)
      return;

    this.refund_tax = +(new Big(+this.selectedOrder.tax).minus(this.previousRefundTax).toFixed(2));
    //console.log(this.refund_tax);
    this.calcRefundTotal();
  }

  setRefundType(totalRefunded: number) {
    if (totalRefunded === this.selectedOrder.total) {
      this.selectedOrder.return.refund_type = 'Full';
    } else if (totalRefunded > 0) {
      this.selectedOrder.return.refund_type = 'Partial';
    } else {
      alert('The Refund Amount must be greater than $0')
      return false;
    }
    return true;
  }

  fixShippingInput() {
    if (this.refund_shipping === null) {
      this.refund_shipping = 0;
    }
    this.refund_shipping = (+new Big(this.refund_shipping).toFixed(2));
  }

  checkRefundShippingAmount() {
    let tsr = new Big(this.previousRefundShipping).plus(this.refund_shipping);
    let totalShippingRefund = +tsr.toFixed(2);
    if (totalShippingRefund > this.selectedOrder.shipping) {
      alert('Refunded Shipping cannot be greater than the Original Shipping Charge');
      return false;
    }
    return true;
  }

  checkTotalRefunded(totalRefunded: number) {
    if (totalRefunded > this.selectedOrder.total) {
      console.log(totalRefunded)
      console.log(this.selectedOrder.total)
      alert('You cannot refund more than the customer was originally charged');
      return false;
    }
    return true;
  }

  async confirmRefund() {
    let confirmation = confirm('You are about to issue a refund for $' + this.refund_total + '. This action cannot be undone. Would you like to continue?');
    if (confirmation) {
      for (let i = 0; i < this.selectedOrder.products.length; i++) {
        this.selectedOrder.products[i].quantity_refunded = +this.selectedOrder.products[i].quantity_refunded + +this.newRefund[i].quantity_refunded;
        this.selectedOrder.products[i].quantity_restocked = +this.selectedOrder.products[i].quantity_restocked + +this.newRefund[i].quantity_restocked;
        this.selectedOrder.products[i].quantity_available_refund = +this.selectedOrder.products[i].quantity_available_refund - +this.newRefund[i].quantity_refunded;
        this.selectedOrder.products[i].quantity_available_restock = +this.selectedOrder.products[i].quantity_available_restock - +this.newRefund[i].quantity_refunded; // ???
        
        if (this.newRefund[i].quantity_restocked > 0) {
          await this.ProductService.restock(this.newRefund[i].product._id, this.newRefund[i].selectedSize, this.newRefund[i].quantity_restocked)
        }
        //console.log(this.selectedOrder.products[i])
      }
      let ref_amt = new Big(+this.selectedOrder.return.refund_amount).plus(this.refund_total);
      this.selectedOrder.return.refund_amount = +ref_amt.toFixed(2);

      let ref_shp = new Big(+this.selectedOrder.return.refund_shipping_amount).plus(this.refund_shipping);
      this.selectedOrder.return.refund_shipping_amount = +ref_shp.toFixed(2);

      Big.RM = 2;
      let ref_tax = new Big(+this.selectedOrder.return.refund_tax).plus(this.refund_tax);
      this.selectedOrder.return.refund_tax = +ref_tax.toFixed(2);
      Big.RM = 0;
      console.log(this.selectedOrder.return.refund_tax);
      
      
      let response = await this.RefundService.refund(this.selectedOrder, this.refund_total);
      if (response) {
        this.SnackbarService.onSuccess();
        this.restockProducts();
        await this.initialize();
      } else {
        this.SnackbarService.onError();
      }
      
    } else {
      await this.initialize();
    }
  }

  restockProducts() {

  }





}
