import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSubscriptionService {
  public unsubscribeComponent$ = new Subject<void>();
  public unsubscribe$ = this.unsubscribeComponent$.asObservable();
}
