import { CartProduct } from '../cartProduct'; ///must use models so they are separte items in memory
import { Address } from './shipping';
import { SquareTransactionResponse } from './square';


export interface Order {
    _id?: string,
    address: Address,
    products: CartProduct[],
    payment: Payment,
    subtotal: number,
    tax: number,
    taxRate: number,
    shipping: number,
    total: number,
    cost: number,
    shipped: boolean,
    shipmentId: string,
    shippingCarrier: string,
    shippingMethod: string, //called service in easypost
    trackingNumber: string, //tracking_code in easypost
    trackingUrl: string,
    shippingLabel: string,
    return: Return,
    
    createdAt?: Date,
    updatedAt?: Date,
    readableCreatedAt?: string

}

/////////////////////////////////////////////////
// ORDER PAYMENT DETAILS 
/////////////////////////////////////////////////

export interface Payment {
    processor: string,
    square?: SquareTransactionResponse,
    paypal_txID?: string,
}

/////////////////////////////////////////////////
// ORDER Return  
/////////////////////////////////////////////////

export interface Return {
    return_initiated: boolean,
    return_received: boolean,
    return_reason: string,
    refund_type: string,
    refund_shipping: boolean,
    refund_shipping_amount: number,
    refund_tax: number,
    refund_amount: number,

    //refunded_products: CartProduct[],
    //restocked_products: CartProduct[],
    refunded: boolean,
    notes: string,
}

export interface OrderResponse {
    data: Order
}

export interface MultipleOrderResponse {
    data: Order[]
}

