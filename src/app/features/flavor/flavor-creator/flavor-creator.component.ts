import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { FlavorActions, selectFlavorsLoading } from 'src/app/store/flavor';

@Component({
  selector: 'app-flavor-creator',
  templateUrl: './flavor-creator.component.html',
  styleUrls: ['./flavor-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlavorCreatorComponent implements OnInit, OnDestroy {
  public loading$ = this.store.select(selectFlavorsLoading);
  public submitAllowed = true;
  private subscriptions: Subscription[] = [];

  public form = new FormGroup({
    type: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  get type() {
    return this.form.get('type')!;
  }

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscriptions.push(
      this.loading$.subscribe((res) => this.submitAllowed === res)
    );
  }

  ngOnDestroy(): void {}

  submit() {
    if (!this.submitAllowed) return;
    this.store.dispatch(
      FlavorActions.ADD_FLAVOR({ flavor: { name: this.type.value } })
    );
    console.log(this.type.value);
  }
}
