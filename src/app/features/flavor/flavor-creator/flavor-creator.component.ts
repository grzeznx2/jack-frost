import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { FlavorActions, selectFlavorsLoading } from 'src/app/store/flavor';

@Component({
  selector: 'app-flavor-creator',
  templateUrl: './flavor-creator.component.html',
  styleUrls: ['./flavor-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlavorCreatorComponent {
  public loading$ = this.store.select(selectFlavorsLoading);
  public submitAllowed = true;

  public form = new FormGroup({
    type: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  get type() {
    return this.form.get('type')!;
  }

  constructor(private store: Store<AppState>) {}

  submit(loading: boolean) {
    if (loading) return;
    this.store.dispatch(
      FlavorActions.ADD_FLAVOR({ flavor: { name: this.type.value } })
    );
    console.log(this.type.value);
  }
}
