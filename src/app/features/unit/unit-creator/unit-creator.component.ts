import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { UnitActions } from 'src/app/store/unit';

@Component({
  selector: 'app-unit-creator',
  templateUrl: './unit-creator.component.html',
  styleUrls: ['./unit-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitCreatorComponent implements OnInit {
  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    weight: new FormControl(0, [Validators.required, Validators.min(0.1)]),
  });

  get name() {
    return this.form.get('name')!;
  }

  get weight() {
    return this.form.get('weight')!;
  }

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  submit() {
    this.store.dispatch(
      UnitActions.ADD_UNIT({
        unit: { name: this.name.value, weight: this.weight.value },
      })
    );
    console.log(this.form.value);
  }
}
