import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { AuthActions } from 'src/app/store/auth';
import { OrderActions } from 'src/app/store/order';
import { FlavorId, FlavorWithId } from '../../flavor/flavor.model';
import { UnitWithId } from '../../unit/unit.model';

@Component({
  selector: 'app-order-flavor-unit',
  templateUrl: './order-flavor-unit.component.html',
  styleUrls: ['./order-flavor-unit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFlavorUnitComponent {
  @Input() flavor!: FlavorWithId;
  @Input() units!: UnitWithId[];
  @Input() isLiked!: boolean;

  public form = new FormGroup({
    unit: new FormControl('', [Validators.required]),
    multiplier: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  constructor(private store: Store<AppState>) {}

  get unit() {
    return this.form.get('unit')!;
  }

  get multiplier() {
    return this.form.get('multiplier')!;
  }

  submit() {
    this.store.dispatch(
      OrderActions.ADD_FLAVOR_UNIT({
        flavorUnit: {
          flavorId: this.flavor.id,
          unitId: this.unit.value,
          amount: this.multiplier.value,
        },
      })
    );
  }

  handleClick(flavorId: FlavorId) {
    if (this.isLiked) {
      this.dislikeFlavor(flavorId);
    } else {
      this.likeFlavor(flavorId);
    }
  }

  likeFlavor(flavorId: FlavorId) {
    this.store.dispatch(AuthActions.LIKE_FLAVOR({ flavorId }));
  }

  dislikeFlavor(flavorId: FlavorId) {
    this.store.dispatch(AuthActions.DISLIKE_FLAVOR({ flavorId }));
  }
}
