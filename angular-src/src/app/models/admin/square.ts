
export interface SquareResponse {
    data: SquareTransactionResponse
}


export interface SquareTransactionResponse {
    transactionId?: string,
    locationId?: string,
    idempotency_key?: string,
    tenders?: Tender,
    error?: string,
}
export interface Tender {
    type: string,
    id: string,
    location_id: string,
    transaction_id: string,
    amount_money: Money,
    status: string,
}

export interface Money {
    amount: number,
    currency: string, //USD
}

///////////////////////////////////////////////



export interface SquarePayment {
    idempotency_key?: string,
    card_nonce: string,
    amount_money: Money,
    shipping_address: SquareAddress,
    buyer_email_address: string,
}


export interface SquareAddress {
    first_name: string;
    last_name: string;
    address_line_1: string;
    address_line_2: string;
    locality: string;
    administrative_district_level_1: string;
    postal_code: string;
    country: string;
}

