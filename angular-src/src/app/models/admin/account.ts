export interface AccountResponse {
    data: Account
  }
  
export class Account {
    public name: string;
    public logo?: string;
    public facebook?: string;
    public instagram?: string;
    public twitter?: string;
    public _id?: string;
  
    constructor() {
  
    }
  
  
  
  }
  