import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { selectUnitsLoading, UnitActions } from 'src/app/store/unit';

@Component({
  selector: 'app-unit-creator',
  templateUrl: './unit-creator.component.html',
  styleUrls: ['./unit-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitCreatorComponent {
  public loading$ = this.store.select(selectUnitsLoading);
  public form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    weight: new FormControl(0.1, [
      Validators.required,
      Validators.min(0.1),
      Validators.max(1000),
    ]),
  });

  get name() {
    return this.form.get('name')!;
  }

  get weight() {
    return this.form.get('weight')!;
  }

  constructor(private store: Store<AppState>) {}

  submit() {
    if (this.form.invalid) return;
    this.store.dispatch(
      UnitActions.ADD_UNIT({
        unit: { name: this.name.value, weight: this.weight.value },
      })
    );
  }
}
