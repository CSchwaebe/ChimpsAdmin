import { Collection } from './collection';
import { Product } from './product';

 
 export interface HomeResponse {
     data: Home;
 }
 
 export interface Slideshow {
     images: Array<String>
 }

export interface FeaturedCollections {
    collections: string;
}

export class Home {
    public images: string[];
    public featuredCollections?: Collection[];
    public featuredProducts?: Product[];

    constructor() {}

}

