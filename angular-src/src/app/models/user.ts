
/*
export interface User {
    email: String,
    username: String,
    password: String
}
*/

export interface UserResponse {
    data: string,
}


export interface VerificationResponse {
    data: boolean,
}

export class User {
    public email: String;
    public username: String;
    public password: String;
    
    constructor() { }
    
}