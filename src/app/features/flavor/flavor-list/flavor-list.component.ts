import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/app.state';
import {
  FlavorActions,
  selectFlavorsError,
  selectFlavorsList,
  selectFlavorsLoading,
} from 'src/app/store/flavor';
import { FlavorId } from '../flavor.model';

@Component({
  selector: 'app-flavor-list',
  templateUrl: './flavor-list.component.html',
  styleUrls: ['./flavor-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlavorListComponent {
  flavors$ = this.store.select(selectFlavorsList);
  loading$ = this.store.select(selectFlavorsLoading);
  error$ = this.store.select(selectFlavorsError);

  constructor(private store: Store<AppState>) {}

  deleteFlavor(id: FlavorId) {
    this.store.dispatch(FlavorActions.DELETE_FLAVOR({ id }));
  }
}
