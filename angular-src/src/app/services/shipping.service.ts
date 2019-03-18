import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Address, AddressResponse, ShipmentResponse, TempShipment, Tracking, TrackingResponse, Rate, ShippingRefundResponse } from 'src/app/models/admin/shipping';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class ShippingService {

  address: Address;
  url: string = environment.baseURL + 'api/shipping';
  shipmentId: string = '';
  public tracking: string;
  public public_url: string;

  constructor(private http: HttpClient,
              private LocalStorageService: LocalStorageService) { }

  //Weight is in ounces
  async createShipment(addr: Address, weight: number) {
    return new Promise<TempShipment>(async (resolve, reject) => {
      let obj = {
        address: addr,
        weight: weight,
      };
      this.http.post(this.url, obj).subscribe((res: ShipmentResponse) => {
        if (res.data) {
          this.shipmentId = res.data.id;
          resolve(res.data);
        } else {
          resolve(null);
        }
       
       
      });
    })
  }

  //Weight is in ounces
  async buyShipment(rate: Rate) {
    return new Promise<Tracking>(async (resolve, reject) => {
      this.http.post(this.url + '/purchase', {rate: rate, id: this.shipmentId}).subscribe((res: TrackingResponse) => {
        this.tracking = res.data.tracking;
        this.public_url = res.data.public_url;
        console.log(this.tracking);
        console.log(this.public_url);
        console.log(res.data);

        /*
        let tmp = this.LocalStorageService.retrieve('trackingInfo');
        let obj =  { tracking: this.tracking, public_url: this.public_url };
        if (tmp == null) {
          //let arr = [obj]
          this.LocalStorageService.store('trackingInfo', obj)
        } else {
          //tmp.push(obj)
          this.LocalStorageService.store('trackingInfo', obj)
        }
        */
        resolve(res.data);
      });
    })
  }


  async refundShipment(id: string) {
    return 'submitted';
    return new Promise<string>(async (resolve, reject) => {
      this.http.post(this.url + '/refund', {id: id}).subscribe((res: ShippingRefundResponse) => {
        console.log(res.data);
        resolve(res.data);
      });
    })
  }

}


  