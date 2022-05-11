import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { selectUser } from 'src/app/store/auth';
import { selectFlavors, selectFlavorsList } from 'src/app/store/flavor';
import {
  OrderActions,
  selectFlavorUnitList,
  selectLastUserOrder,
  selectUserHasOrderedToday,
} from 'src/app/store/order';
import { selectUnits, selectUnitsList } from 'src/app/store/unit';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-creator',
  templateUrl: './order-creator.component.html',
  styleUrls: ['./order-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderCreatorComponent implements OnDestroy {
  public hasOrderedToday$ = this.store.select(selectUserHasOrderedToday);
  public lastOrder$ = this.store.select(selectLastUserOrder);
  public user$ = this.store.select(selectUser);
  public flavorsList$ = this.store.select(selectFlavorsList);
  public unitsList$ = this.store.select(selectUnitsList);
  public flavors$ = this.store.select(selectFlavors);
  public units$ = this.store.select(selectUnits);
  public flavorUnits$ = this.store.select(selectFlavorUnitList);

  constructor(
    private store: Store<AppState>,
    private orderService: OrderService
  ) {}

  ngOnDestroy(): void {
    this.orderService.unsubscribeComponent$.next();
  }

  createOrder() {
    this.store.dispatch(OrderActions.ADD_ORDER());
  }

  repeatLastOrder() {
    this.store.dispatch(OrderActions.REPEAT_LAST_USER_ORDER());
  }
}
