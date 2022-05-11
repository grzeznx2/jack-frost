import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  map,
  mergeMap,
  of,
  pluck,
  repeat,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { UserSubscriptionService } from 'src/app/features/user/user-subscription.service';
import { UserService } from 'src/app/features/user/user.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { AppState } from '../app.state';
import { selectAllOrders } from '../order';
import { StorageActions } from '../storage';
import { UserActions } from './user.actions';
import { selectUsers } from './user.selectors';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<AppState>,
    private subService: UserSubscriptionService,
    private snackBar: SnackBarService
  ) {}

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.ADD_USER),
      pluck('user'),
      switchMap((user) =>
        this.userService.addUser(user).pipe(
          map((newUserData) => {
            return UserActions.ADD_USER_SUCCESS({
              user: { ...user, ...newUserData },
            });
          }),
          catchError((error) =>
            of(UserActions.ADD_USER_FAILURE({ error: error.message }))
          )
        )
      )
    )
  );

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.FETCH_USERS),
      switchMap(() =>
        this.userService.getUsers().pipe(
          takeUntil(this.subService.unsubscribe$),
          map((users) => UserActions.FETCH_USERS_SUCCESS({ users })),
          catchError((error) =>
            of(UserActions.FETCH_USERS_FAILURE({ error: error.message }))
          )
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.DELETE_USER),
      withLatestFrom(this.store.select(selectAllOrders)),
      map(([action, allOrders]) => {
        const { byIds, idList } = allOrders;
        idList.forEach((id) => {
          const order = byIds[id];
          if (order.userId === action.id)
            throw new Error(
              'Nie można usunąć wybranego klienta, który posiada zamówienie!'
            );
        });
        return action;
      }),
      mergeMap(({ id }) =>
        of(this.userService.deleteUser(id)).pipe(
          map(() => UserActions.DELETE_USER_SUCCESS({ id })),
          catchError((error) =>
            of(UserActions.DELETE_USER_FAILURE({ error: error.message }))
          )
        )
      ),
      catchError((error) =>
        of(UserActions.DELETE_USER_FAILURE({ error: error.message }))
      ),
      repeat()
    )
  );

  deleteUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.DELETE_USER_FAILURE),
        tap((res) => {
          this.snackBar.showSnackbar(res.error, undefined, 3000);
        })
      ),
    { dispatch: false }
  );

  pushUserStateToStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.PUSH_USER_STATE_TO_LOCAL_STORAGE),
        withLatestFrom(this.store.select(selectUsers)),
        tap(([_, usersState]) => {
          this.store.dispatch(
            StorageActions.SET_ITEM({ key: 'users', payload: usersState })
          );
        })
      ),
    { dispatch: false }
  );

  onUserStateChange$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          UserActions.ADD_USER,
          UserActions.ADD_USER_FAILURE,
          UserActions.ADD_USER_SUCCESS,
          UserActions.DELETE_USER,
          UserActions.DELETE_USER_FAILURE,
          UserActions.ADD_USER_SUCCESS,
          UserActions.FETCH_USERS,
          UserActions.FETCH_USERS_FAILURE,
          UserActions.FETCH_USERS_SUCCESS,
          UserActions.LIKE_FLAVOR,
          UserActions.LIKE_FLAVOR_FAILURE,
          UserActions.LIKE_FLAVOR_SUCCESS,
          UserActions.DISLIKE_FLAVOR,
          UserActions.DELETE_USER_FAILURE,
          UserActions.DISLIKE_FLAVOR_SUCCESS
        ),
        tap(() => {
          this.store.dispatch(UserActions.PUSH_USER_STATE_TO_LOCAL_STORAGE());
        })
      ),
    { dispatch: false }
  );

  addUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.ADD_USER_SUCCESS),
        tap(() => {
          this.snackBar.showSnackbar('Dodano nowego klienta!');
        })
      ),
    { dispatch: false }
  );

  deleteUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.DELETE_USER_SUCCESS),
        tap(() => {
          this.snackBar.showSnackbar('Kient został usunięty!');
        })
      ),
    { dispatch: false }
  );
}
