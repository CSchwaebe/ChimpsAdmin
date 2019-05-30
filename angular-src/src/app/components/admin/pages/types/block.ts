import { Type } from '@angular/core';

export class Block {

    public component: Type<any>;
    public data: any;

    constructor(component: Type<any>, data: any) {
        this.component = component;
        this.data = data;
    }

}
