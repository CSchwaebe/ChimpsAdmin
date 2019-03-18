
export interface Address {
    name: string,
    email: string,
    phone: string,
    street1: string,
    street2: string,
    city: string,
    state: string,
    zip: string,
    country: string,
    verify: [string]
}

export interface AddressResponse {
    data: Address;
}

export interface ShipmentResponse {
    data: TempShipment
}

export interface TempShipment {
    id: string,
    rate: string,
    delivery_days: number,
    rate_objects: Rate[]
}

export interface TrackingResponse {
    data: Tracking
}

export interface Tracking {
    tracking: string,
    public_url: string,
    shippingLabel: string
}

export interface Rate {
    id: string,
    carrier: string,
    createdAt: string,
    currency: string,
    
    object: string,
    rate: string,
    service: string,
    shipment_id: string,
    updatedAt: string,
    delivery_days: number
}


export interface ShippingRefundResponse {
    data: string
}



