import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  selectUnitsError,
  selectUnitsList,
  selectUnitsLoading,
  UnitActions,
} from 'src/app/store/unit';
import { UnitId } from '../unit.model';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss'],
})
export class UnitListComponent {
  units$ = this.store.select(selectUnitsList);
  loading$ = this.store.select(selectUnitsLoading);
  error$ = this.store.select(selectUnitsError);

  constructor(private store: Store<AppState>) {}

  deleteUnit(id: UnitId) {
    this.store.dispatch(UnitActions.DELETE_UNIT({ id }));
  }
}
