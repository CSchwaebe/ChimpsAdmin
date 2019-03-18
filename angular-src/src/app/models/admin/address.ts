import { Address } from './shipping';

export class AddressModel {
    public name: string;
    public email: string;
    public phone: string;
    public street1: string;
    public street2: string;
    public city: string;
    public state: string;
    public zip: string;
    public country: string;
    public verify: [string];

    constructor(address: Address) {
        for (let key in address) {
            this[key] = address[key];
        }
        this.verify = ['delivery'];
    }

}
