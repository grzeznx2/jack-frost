import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectFlavorById } from 'src/app/store/flavor';
import { OrderActions } from 'src/app/store/order';
import { selectUnitById } from 'src/app/store/unit';
import { FlavorWithId } from '../../flavor/flavor.model';
import { UnitWithId } from '../../unit/unit.model';
import { FlavorUnit } from '../order.model';

@Component({
  selector: 'app-order-selected-flavor-unit',
  templateUrl: './order-selected-flavor-unit.component.html',
  styleUrls: ['./order-selected-flavor-unit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSelectedFlavorUnitComponent implements OnInit {
  @Input() flavorUnit!: FlavorUnit;

  public flavor$!: Observable<FlavorWithId>;
  public unit$!: Observable<UnitWithId>;
  public form!: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.flavor$ = this.store.select(
      selectFlavorById(this.flavorUnit.flavorId)
    );
    this.unit$ = this.store.select(selectUnitById(this.flavorUnit.unitId));

    this.initForm();
  }

  get multiplier() {
    return this.form.get('multiplier');
  }

  private initForm() {
    this.form = new FormGroup({
      multiplier: new FormControl(this.flavorUnit.amount, [
        Validators.required,
        Validators.min(1),
      ]),
    });

    this.multiplier?.valueChanges.subscribe((value) =>
      this.store.dispatch(
        OrderActions.UPDATE_AMOUNT_FLAVOR_UNIT({
          amount: value,
          flavorUnitId: this.flavorUnit.id,
        })
      )
    );
  }

  deleteFlavorUnit() {
    this.store.dispatch(
      OrderActions.DELETE_FLAVOR_UNIT({ flavorUnitId: this.flavorUnit.id })
    );
  }
}
