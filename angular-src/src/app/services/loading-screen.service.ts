import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {
  public loading: Subject<boolean> = new Subject<boolean>();
  constructor() { }

  on() {
    console.log('Loading Screen Service On')
    this.loading.next(true);
  }

  off() {
    console.log('Loading Screen Service Off')
    this.loading.next(false);
  }

  getLoading() {
    return this.loading.asObservable();
  }
}
