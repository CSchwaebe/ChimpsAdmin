/*
export interface Product {
    active: boolean,
    name: string,
    price: number,
    cost: number,
    weight: Weight,
    //sizes: Sizes,
    //quantity: Quantity,
    inventory: Variant[],
    color: string,
    description: string,
    shop: string,
    images: string[],
    featured: boolean,
    category?: string,
    subcategory?: string,
    stub?: string,
    location?: string,
    _id?: string
}
*/


export interface ProductResponse {
    data: Product;
}

export interface AllProductResponse {
    data: Product[];
}


export interface Variant {
    size?: string,
    color?: string,
    material?: string,
    quantity?: number,
    sku?: string,
    barcode?: any,
    weight?: number,
    trackInventory?: boolean
}


export interface Weight {
    pounds?: number,
    ounces?: number,
    grams?: number,
    kilograms?: number
}


export class Product {
    public active: boolean;
    public name: string;
    public price: number;
    public cost: number;
    public weight: Weight;
    public inventory: Variant[];
    public images: string[];
    public color: string;
    public description: string;
    public shop: string;
    public featured: boolean;
    public category?: string;
    public subcategory?: string;
    public stub?: string;
    public location?: string;
    public _id?: string;


    constructor(
      ) {  }

}

export class Version {
    public size: string;
    public color: string;
    public material: string;
    public quantity: number;
    public sku: string;
    public barcode: any;
    public weight: number;
    public trackInventory: boolean;
   
    constructor() {

    }
}


/*
export interface Product {
    active: boolean,
    name: string,
    price: number,
    cost: number,
    weight: Weight,
    //sizes: Sizes,
    //quantity: Quantity,
    inventory: Variant[],
    color: string,
    description: string,
    shop: string,
    images: string[],
    category?: string,
    subcategory?: string,
    stub?: string,
    location?: string,
    _id?: string
}


export interface Variant {
    size?: string,
    color?: string,
    material?: string,
    quantity?: number,
    sku?: string,
    barcode?: any,
    weight?: number,
    trackInventory?: boolean
}


export interface Weight {
    pounds?: number,
    ounces?: number,
    grams?: number,
    kilograms?: number
}

export interface ProductResponse {
    data: Product;
}

export interface AllProductResponse {
    data: Product[];
}
*/

