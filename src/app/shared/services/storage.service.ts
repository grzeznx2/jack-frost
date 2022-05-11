import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { FlavorActions, FlavorState } from 'src/app/store/flavor';
import { OrderActions, OrderState } from 'src/app/store/order';
import { UnitActions, UnitState } from 'src/app/store/unit';
import { UserActions, UserState } from 'src/app/store/user';
import { AuthActions, AuthState } from '../../store/auth';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private store: Store<AppState>) {}

  getStoredItemList() {
    const storedItems = this.getItem<(keyof AppState)[]>('storedItems')!;
    if (!storedItems) {
      localStorage.setItem('storedItems', JSON.stringify([]));
      return [] as (keyof AppState)[];
    }
    return storedItems;
  }

  setItem<T>(key: keyof AppState, payload: T) {
    localStorage.setItem(key, JSON.stringify(payload));
    const storedItems = this.getStoredItemList();
    let updatedStoreItems = [...new Set([...storedItems, key])];
    localStorage.setItem('storedItems', JSON.stringify(updatedStoreItems));
  }

  getItem<T>(key: string) {
    let item = localStorage.getItem(key);
    if (item) return JSON.parse(item) as T;
    return null;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clearStorage() {
    const storedItems = this.getStoredItemList();
    storedItems.forEach((item) => {
      this.removeItem(item);
    });
  }

  rehydrate() {
    const storedItems = this.getStoredItemList();
    storedItems.forEach((item) => {
      switch (item) {
        case 'auth':
          const authState = this.getItem<AuthState>(item);
          if (authState) {
            this.store.dispatch(AuthActions.SET_AUTH_STATE({ authState }));
          }
          break;
        case 'flavors':
          const flavorState = this.getItem<FlavorState>(item);
          if (flavorState) {
            this.store.dispatch(
              FlavorActions.SET_FLAVOR_STATE({ state: flavorState })
            );
          }
          break;
        case 'orders':
          const orderState = this.getItem<OrderState>(item);
          if (orderState) {
            this.store.dispatch(
              OrderActions.SET_ORDER_STATE({ state: orderState })
            );
          }
          break;
        case 'units':
          const unitState = this.getItem<UnitState>(item);
          if (unitState) {
            this.store.dispatch(
              UnitActions.SET_UNIT_STATE({ state: unitState })
            );
          }
          break;
        case 'users':
          const userState = this.getItem<UserState>(item);
          if (userState) {
            this.store.dispatch(
              UserActions.SET_USER_STATE({ state: userState })
            );
          }
          break;
      }
    });
  }
}
