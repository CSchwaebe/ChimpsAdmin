
export interface SubscriberResponse {
    data: Subscriber;
}

export interface AllSubscriberResponse {
    data: [Subscriber];
}

export class Subscriber {
    public _id?: string;
    public name: string;
    public email: string;
    public phone: string;

    constructor(name?: string, email?:string, phone?:string) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}



