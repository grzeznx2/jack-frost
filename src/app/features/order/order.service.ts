import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { exhaustMap, from, map, Observable, Subject } from 'rxjs';
import { UserService } from '../user/user.service';
import { OrderDB, OrderId, OrderPayload } from './order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private collection: AngularFirestoreCollection<OrderPayload>;
  public unsubscribeComponent$ = new Subject<void>();
  public unsubscribe$ = this.unsubscribeComponent$.asObservable();

  constructor(
    private readonly db: AngularFirestore,
    private userService: UserService
  ) {
    this.collection = db.collection<OrderPayload>('orders');
  }

  public addOrder(order: OrderPayload) {
    return from(this.collection.add(order)).pipe(
      map((flavorRef) => flavorRef.id),
      exhaustMap((orderId) => {
        if (!orderId) {
          throw new Error('Wystąpił błąd w czasie dodawania zamówienia.');
        } else {
          return from(
            this.userService.updateUser(order.userId, {
              lastOrder: { id: orderId, createdAt: new Date() },
            })
          ).pipe(map(() => orderId));
        }
      })
    );
  }

  public getOrders(): Observable<OrderDB[]> {
    return this.collection.snapshotChanges().pipe(
      map((orders) =>
        orders.map((order) => ({
          id: order.payload.doc.id,
          ...order.payload.doc.data(),
        }))
      )
    );
  }

  public getOrderById(id: OrderId) {
    return this.db
      .doc<OrderDB>(`orders/${id}`)
      .valueChanges()
      .pipe(
        map((res) => {
          if (res) {
            return { ...res, id };
          } else {
            throw new Error('Zamówienie o podanym ID nie istnieje');
          }
        })
      );
  }

  public deleteOrder(id: OrderId) {
    return this.db.doc(`orders/${id}`).delete();
  }
}
