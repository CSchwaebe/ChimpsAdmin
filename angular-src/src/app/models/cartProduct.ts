import { Product } from 'src/app/models/admin/product';

export class CartProduct {
    quantity_refunded: number;
    quantity_restocked: number;
    quantity_available_refund: number;
    quantity_available_restock: number;

    constructor(public product?: Product,
                public selectedSize?: string,
                public quantity?: number,
                ) { 
                    this.quantity_available_refund = quantity;
                    this.quantity_available_restock = quantity;
                    this.quantity_refunded = 0;
                    this.quantity_restocked = 0;
                }
    
            

}