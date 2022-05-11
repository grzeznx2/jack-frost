import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  map,
  of,
  pluck,
  repeat,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { UnitService } from 'src/app/features/unit/unit.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { AppState } from '../app.state';
import { FlavorActions } from '../flavor';
import { selectAllOrders } from '../order';
import { StorageActions } from '../storage';
import { UnitActions } from './unit.actions';
import { selectUnits, selectUnitsList } from './unit.selectors';

@Injectable()
export class UnitEffects {
  constructor(
    private actions$: Actions,
    private unitService: UnitService,
    private store: Store<AppState>,
    private snackBar: SnackBarService
  ) {}

  addUnit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnitActions.ADD_UNIT),
      withLatestFrom(this.store.select(selectUnitsList)),
      map(([newUnit, unitsList]) => {
        if (unitsList.some((unit) => unit.name === newUnit.unit.name)) {
          throw new Error('Pojemnik o podanej nazwie już istnieje!');
        }

        return newUnit;
      }),
      pluck('unit'),
      switchMap((unit) =>
        this.unitService.addUnit(unit).pipe(
          map((res) => {
            return UnitActions.ADD_UNIT_SUCCESS({
              unit: { ...unit, id: res },
            });
          }),
          catchError((error) =>
            of(UnitActions.ADD_UNIT_FAILURE({ error: error.message }))
          )
        )
      ),
      catchError((error) =>
        of(UnitActions.ADD_UNIT_FAILURE({ error: error.message }))
      ),
      repeat()
    )
  );

  getUnits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnitActions.FETCH_UNITS),
      switchMap(() =>
        this.unitService.getUnits().pipe(
          take(1),
          map((unitsWithId) =>
            UnitActions.FETCH_UNITS_SUCCESS({ unitsWithId })
          ),
          catchError((error) =>
            of(UnitActions.FETCH_UNITS_FAILURE({ error: error.message }))
          )
        )
      )
    )
  );

  deleteUnit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnitActions.DELETE_UNIT),
      withLatestFrom(this.store.select(selectAllOrders)),
      map(([action, allOrders]) => {
        const { idList, byIds } = allOrders;
        idList.forEach((id) => {
          const order = byIds[id];
          order.flavorUnits.forEach((flavorUnit) => {
            if (flavorUnit.unitId === action.id) {
              throw new Error(
                'Nie można usunąć wybranego pojemnika, ponieważ został użyty w jednym z aktualnych zamówień!'
              );
            }
          });
        });
        return action;
      }),
      switchMap(({ id }) =>
        this.unitService.deleteUnit(id).pipe(
          map(() => UnitActions.DELETE_UNIT_SUCCESS({ id })),
          catchError((error) =>
            of(UnitActions.DELETE_UNIT_FAILURE({ error: error.message }))
          )
        )
      ),
      catchError((error) =>
        of(UnitActions.DELETE_UNIT_FAILURE({ error: error.message }))
      ),
      repeat()
    )
  );

  deleteUnitFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UnitActions.DELETE_UNIT_FAILURE, UnitActions.ADD_UNIT_FAILURE),
        tap((res) => {
          this.snackBar.showSnackbar(res.error, undefined, 3000);
        })
      ),
    { dispatch: false }
  );

  pushUnitStateToStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UnitActions.PUSH_UNIT_STATE_TO_LOCAL_STORAGE),
        withLatestFrom(this.store.select(selectUnits)),
        tap(([_, unitState]) => {
          this.store.dispatch(
            StorageActions.SET_ITEM({ key: 'units', payload: unitState })
          );
        })
      ),
    { dispatch: false }
  );

  onOrderStateChange$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          UnitActions.ADD_UNIT,
          UnitActions.ADD_UNIT_FAILURE,
          UnitActions.ADD_UNIT_SUCCESS,
          UnitActions.DELETE_UNIT,
          UnitActions.DELETE_UNIT_FAILURE,
          UnitActions.ADD_UNIT_SUCCESS,
          UnitActions.FETCH_UNITS,
          UnitActions.FETCH_UNITS_FAILURE,
          UnitActions.FETCH_UNITS_SUCCESS
        ),
        tap(() => {
          this.store.dispatch(UnitActions.PUSH_UNIT_STATE_TO_LOCAL_STORAGE());
        })
      ),
    { dispatch: false }
  );

  addUnitSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UnitActions.ADD_UNIT_SUCCESS),
        tap(() => {
          this.snackBar.showSnackbar('Dodano nowy pojemnik!');
        })
      ),
    { dispatch: false }
  );

  deleteUnitSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UnitActions.DELETE_UNIT_SUCCESS),
        tap(() => {
          this.snackBar.showSnackbar('Wybrany pojemnik został usunięty!');
        })
      ),
    { dispatch: false }
  );
}
