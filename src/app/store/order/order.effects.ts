import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  exhaustMap,
  map,
  of,
  pluck,
  switchMap,
  take,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { OrderService } from 'src/app/features/order/order.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { selectFlavorUnitList } from '.';
import { AppState } from '../app.state';
import { selectUserId } from '../auth';
import { StorageActions } from '../storage';
import { OrderActions } from './order.actions';
import { selectLastUserOrder, selectOrders } from './order.selectors';
@Injectable()
export class OrderEffects {
  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private store: Store<AppState>,
    private snackBar: SnackBarService
  ) {}

  addOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.ADD_ORDER),
      withLatestFrom(
        this.store.select(selectFlavorUnitList),
        this.store.select(selectUserId)
      ),
      map(([_, flavorUnits, userId]) => ({
        flavorUnits,
        userId: userId!,
        createdAt: new Date(),
      })),
      exhaustMap((order) =>
        this.orderService.addOrder(order).pipe(
          map((res) => {
            return OrderActions.ADD_ORDER_SUCCESS({
              order: { ...order, id: res },
            });
          }),
          catchError((error) =>
            of(OrderActions.ADD_ORDER_FAILURE({ error: error.message }))
          )
        )
      )
    )
  );

  getOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.FETCH_ORDERS),
      switchMap(() =>
        this.orderService.getOrders().pipe(
          take(1),
          map((orders) => OrderActions.FETCH_ORDERS_SUCCESS({ orders })),
          catchError((error) =>
            of(OrderActions.FETCH_ORDERS_FAILURE({ error: error.message }))
          )
        )
      )
    )
  );

  fetchUserOrder = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.FETCH_LAST_USER_ORDER),
      pluck('userId'),
      switchMap((userId) =>
        this.orderService.getOrderById(userId).pipe(
          tap(() => {
            console.log('TRYING HARD...');
          }),
          tap(() => {
            console.log('TRYING HARD...');
          }),
          takeUntil(this.orderService.unsubscribe$),
          map((order) => {
            if (order) {
              return OrderActions.SET_LAST_USER_ORDER({ order });
            } else {
              return OrderActions.SET_LAST_USER_ORDER({ order: null });
            }
          })
        )
      ),
      catchError((error) => {
        return of(OrderActions.SET_LAST_USER_ORDER({ order: null }));
      })
    )
  );

  repeatLastUserOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.REPEAT_LAST_USER_ORDER),
      withLatestFrom(this.store.select(selectLastUserOrder)),
      tap(([_, lastOrder]) => {
        if (lastOrder?.flavorUnits) {
          lastOrder.flavorUnits.forEach((flavorUnit) => {
            this.store.dispatch(OrderActions.ADD_FLAVOR_UNIT({ flavorUnit }));
          });
        }
      }),
      map(() => OrderActions.REPEAT_LAST_USER_ORDER_SUCCESS())
    )
  );

  pushOrderStateToStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderActions.PUSH_ORDER_STATE_TO_LOCAL_STORAGE),
        withLatestFrom(this.store.select(selectOrders)),
        tap(([_, orderState]) => {
          this.store.dispatch(
            StorageActions.SET_ITEM({ key: 'orders', payload: orderState })
          );
        })
      ),
    { dispatch: false }
  );

  onOrderStateChange$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          OrderActions.ADD_FLAVOR_UNIT,
          OrderActions.ADD_ORDER,
          OrderActions.ADD_ORDER_FAILURE,
          OrderActions.ADD_ORDER_SUCCESS,
          OrderActions.DELETE_FLAVOR_UNIT,
          OrderActions.FETCH_LAST_USER_ORDER,
          OrderActions.FETCH_LAST_USER_ORDER_FAILURE,
          OrderActions.FETCH_LAST_USER_ORDER_SUCCESS,
          OrderActions.FETCH_ORDERS,
          OrderActions.FETCH_ORDERS_FAILURE,
          OrderActions.FETCH_ORDERS_SUCCESS,
          OrderActions.REPEAT_LAST_USER_ORDER,
          OrderActions.REPEAT_LAST_USER_ORDER_SUCCESS,
          OrderActions.SET_LAST_USER_ORDER,
          OrderActions.UPDATE_AMOUNT_FLAVOR_UNIT
        ),
        tap(() => {
          this.store.dispatch(OrderActions.PUSH_ORDER_STATE_TO_LOCAL_STORAGE());
        })
      ),
    { dispatch: false }
  );

  addOrderSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderActions.ADD_ORDER_SUCCESS),
        tap(() => {
          this.snackBar.showSnackbar('Dodano nowe zamówienie!');
        })
      ),
    { dispatch: false }
  );
}
