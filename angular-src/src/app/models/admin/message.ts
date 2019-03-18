
export interface MessageResponse {
    data: Message
}

export interface AllMessagesResponse {
    data: [Message]
}

export class Message {
    public _id?: string;
    public name: string;
    public email: string;
    public phone: string;
    public message: string;

    public createdAt?: Date;
    public updatedAt?: Date;
    public status?: boolean;
    public readableCreatedAt?: string;

    constructor() { }

}