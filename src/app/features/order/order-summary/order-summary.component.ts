import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  OrderActions,
  selectOrdersError,
  selectOrdersLoading,
  selectOrdersSummary,
} from 'src/app/store/order';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSummaryComponent implements OnInit {
  public ordersSummary$ = this.store.select(selectOrdersSummary);
  public loading$ = this.store.select(selectOrdersLoading);
  public error$ = this.store.select(selectOrdersError);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(OrderActions.FETCH_ORDERS());
  }
}
