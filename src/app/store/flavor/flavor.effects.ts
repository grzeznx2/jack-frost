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
import { FlavorService } from 'src/app/features/flavor/flavor.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { AppState } from '../app.state';
import { selectAllOrders } from '../order';
import { StorageActions } from '../storage';
import { selectUsers } from '../user';
import { FlavorActions } from './flavor.actions';
import { selectFlavors } from './flavor.selectors';

@Injectable()
export class FlavorEffects {
  constructor(
    private actions$: Actions,
    private flavorService: FlavorService,
    private store: Store<AppState>,
    private snackBar: SnackBarService
  ) {}

  addFlavor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FlavorActions.ADD_FLAVOR),
      pluck('flavor'),
      switchMap((flavor) =>
        of(this.flavorService.addFlavor(flavor)).pipe(
          map(() => {
            return FlavorActions.ADD_FLAVOR_SUCCESS({
              flavor: { ...flavor, id: Math.random() + 's' },
            });
          }),
          catchError((error) =>
            of(FlavorActions.ADD_FLAVOR_FAILURE({ error: error.message }))
          )
        )
      )
    )
  );

  getFlavors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FlavorActions.FETCH_FLAVORS),
      switchMap(() =>
        this.flavorService.getFlavors().pipe(
          take(1),
          map((flavorsWithId) =>
            FlavorActions.FETCH_FLAVORS_SUCCESS({ flavorsWithId })
          ),
          catchError((error) =>
            of(FlavorActions.FETCH_FLAVORS_FAILURE({ error: error.message }))
          )
        )
      )
    )
  );

  deleteFlavor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FlavorActions.DELETE_FLAVOR),

      withLatestFrom(
        this.store.select(selectAllOrders),
        this.store.select(selectUsers)
      ),
      map(([action, allOrders, users]) => {
        const { idList, byIds } = allOrders;
        const { idList: userIdList, byIds: userByIds } = users;
        idList.forEach((id) => {
          const order = byIds[id];
          order?.flavorUnits?.forEach((flavorUnit) => {
            if (flavorUnit.flavorId === action.id) {
              throw new Error(
                'Nie można usunąć wybranego smaku, ponieważ został użyty w jednym z aktualnych zamówień!'
              );
            }
          });
        });

        userIdList.forEach((userId) => {
          const user = userByIds[userId];
          user?.likedFlavors?.forEach((flavorId) => {
            if (flavorId === action.id) {
              throw new Error(
                'Nie można usunąć wybranego smaku, ponieważ został użyty jako jeden z ulubionych smaków klienta!'
              );
            }
          });
        });

        return action;
      }),
      switchMap(({ id }) =>
        of(this.flavorService.deleteFlavor(id)).pipe(
          map(() => FlavorActions.DELETE_FLAVOR_SUCCESS({ id })),
          catchError((error) =>
            of(FlavorActions.DELETE_FLAVOR_FAILURE({ error: error.message }))
          )
        )
      ),

      catchError((error) =>
        of(FlavorActions.DELETE_FLAVOR_FAILURE({ error: error.message }))
      ),
      repeat()
    )
  );

  deleteFlavorFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FlavorActions.DELETE_FLAVOR_FAILURE),
        tap((res) => {
          this.snackBar.showSnackbar(res.error, undefined, 3000);
        })
      ),
    { dispatch: false }
  );

  pushFlavorStateToStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FlavorActions.PUSH_FLAVOR_STATE_TO_LOCAL_STORAGE),
        withLatestFrom(this.store.select(selectFlavors)),
        tap(([_, flavorState]) => {
          this.store.dispatch(
            StorageActions.SET_ITEM({ key: 'flavors', payload: flavorState })
          );
        })
      ),
    { dispatch: false }
  );

  onFlavorStateChange$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          FlavorActions.ADD_FLAVOR,
          FlavorActions.ADD_FLAVOR_FAILURE,
          FlavorActions.ADD_FLAVOR_SUCCESS,
          FlavorActions.DELETE_FLAVOR,
          FlavorActions.DELETE_FLAVOR_FAILURE,
          FlavorActions.DELETE_FLAVOR_SUCCESS,
          FlavorActions.FETCH_FLAVORS,
          FlavorActions.FETCH_FLAVORS_SUCCESS,
          FlavorActions.FETCH_FLAVORS_FAILURE
        ),
        tap(() => {
          this.store.dispatch(
            FlavorActions.PUSH_FLAVOR_STATE_TO_LOCAL_STORAGE()
          );
        })
      ),
    { dispatch: false }
  );

  addFlavorSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FlavorActions.ADD_FLAVOR_SUCCESS),
        tap(() => {
          this.snackBar.showSnackbar('Dodano nowy smak!');
        })
      ),
    { dispatch: false }
  );

  deleteFlavorSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FlavorActions.DELETE_FLAVOR_SUCCESS),
        tap(() => {
          this.snackBar.showSnackbar('Smak został usunięty!');
        })
      ),
    { dispatch: false }
  );
}
