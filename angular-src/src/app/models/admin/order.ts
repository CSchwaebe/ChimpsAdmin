import { CartProduct } from '../cartProduct'; ///must use models so they are separte items in memory
import { Address } from './shipping';


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

export class Order {
    public _id?: string;
    public address: Address;
    public products: CartProduct[];
    public transactionId: string;
    public subtotal: number;
    public tax: number;
    public taxRate: number;
    public shipping: number;
    public total: number;
    public cost: number;
    public shipped: boolean;
    public shipmentId: string;
    public shippingCarrier: string;
    public shippingMethod: string; //called service in easypost
    public trackingNumber: string; //tracking_code in easypost
    public trackingUrl: string;
    public shippingLabel: string;
    public return: Return;

    public createdAt?: Date;
    public updatedAt?: Date;
    public readableCreatedAt?: string;
    
    constructor() {};


}



export interface OrderResponse {
    data: Order
}

export interface MultipleOrderResponse {
    data: Order[]
}


/*
import { CartProduct } from '../models/cartProduct'; ///must use models so they are separte items in memory
import { Address } from './shipping';

export interface Order {
    _id?: string,
    address: Address,
    //name: string,
    //email: string,
    //phone: string,
    products: CartProduct[],
    transactionId: string,
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

*/


