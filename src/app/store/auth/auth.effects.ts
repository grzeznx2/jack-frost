import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  from,
  map,
  mergeMap,
  of,
  pluck,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { AuthService } from 'src/app/features/auth/auth.service';
import { OrderService } from 'src/app/features/order/order.service';
import { UserService } from 'src/app/features/user/user.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { AppState } from '../app.state';
import { FlavorActions } from '../flavor';
import { OrderActions } from '../order';
import { StorageActions } from '../storage/storage.actions';
import { UnitActions } from '../unit';
import { UserActions } from '../user';
import { AuthActions } from './auth.actions';
import { selectAuth, selectUser } from './auth.selectors';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
    private userService: UserService,
    private snackBar: SnackBarService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_USER),

      pluck('user'),
      switchMap((user) =>
        this.authService.login(user).pipe(
          takeUntil(this.authService.unsubscribe$),
          map((user) => {
            if (user) {
              return AuthActions.LOGIN_USER_SUCCESS({ user });
            } else {
              throw Error('Wystąpił błąd w czasie logowania');
            }
          }),
          catchError((error) => {
            return of(AuthActions.LOGIN_USER_FAILURE({ error: error.message }));
          })
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGOUT_USER),
      switchMap(() =>
        from(this.authService.logout()).pipe(
          takeUntil(this.authService.unsubscribe$),
          map(() => {
            return AuthActions.LOGOUT_USER_SUCCESS();
          }),
          catchError((error) => {
            return of(AuthActions.LOGIN_USER_FAILURE({ error: error.message }));
          })
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.REGISTER_USER),
      pluck('user'),
      switchMap((user) =>
        this.authService.register(user).pipe(
          map((newUserData) => {
            return AuthActions.REGISTER_USER_SUCCESS({
              user: { ...newUserData },
            });
          }),
          catchError((error) =>
            of(AuthActions.REGISTER_USER_FAILURE({ error: error.message }))
          )
        )
      )
    )
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.LOGIN_USER_SUCCESS,
          AuthActions.REGISTER_USER_SUCCESS
        ),
        pluck('user'),
        tap((user) => {
          if (user.role === 'ADMIN') {
            this.store.dispatch(UserActions.FETCH_USERS());
            this.store.dispatch(OrderActions.FETCH_ORDERS());
          } else {
            if (user.lastOrder) {
              this.store.dispatch(
                OrderActions.FETCH_LAST_USER_ORDER({
                  userId: user.lastOrder?.id,
                })
              );
            }
          }
          this.store.dispatch(FlavorActions.FETCH_FLAVORS());
          this.store.dispatch(UnitActions.FETCH_UNITS());
          if (user.role === 'ADMIN') {
            this.router.navigateByUrl('/users');
          } else {
            this.router.navigateByUrl('/order-creator');
          }
        })
      ),
    { dispatch: false }
  );

  pushAuthToStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.PUSH_AUTH_TO_LOCAL_STORAGE),
        withLatestFrom(this.store.select(selectAuth)),
        tap(([_, authState]) => {
          this.store.dispatch(
            StorageActions.SET_ITEM({ key: 'auth', payload: authState })
          );
        })
      ),
    { dispatch: false }
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT_USER_SUCCESS),
        tap(() => {
          this.store.dispatch(FlavorActions.CLEAR_FLAVOR_STATE());
          this.store.dispatch(UnitActions.CLEAR_UNIT_STATE());
          this.store.dispatch(UserActions.CLEAR_USER_STATE());
          this.store.dispatch(OrderActions.CLEAR_ORDER_STATE());
          this.store.dispatch(StorageActions.CLEAR_STORAGE());
          this.router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
  );

  authFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.LOGIN_USER_FAILURE,
          AuthActions.REGISTER_USER_FAILURE
        ),
        tap((error) => {
          this.snackBar.showSnackbar(error.error, undefined, 3000);
        })
      ),
    { dispatch: false }
  );

  likeFlavor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LIKE_FLAVOR),
      withLatestFrom(this.store.select(selectUser)),
      mergeMap(([{ flavorId }, user]) =>
        from(
          this.userService.updateUser(user!.id, {
            likedFlavors: [...user!.likedFlavors, flavorId],
          })
        ).pipe(
          map(() => AuthActions.LIKE_FLAVOR_SUCCESS({ flavorId })),
          catchError((error) =>
            of(AuthActions.LIKE_FLAVOR_FAILURE({ error: error.message }))
          )
        )
      )
    )
  );

  dislikeFlavor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.DISLIKE_FLAVOR),
      withLatestFrom(this.store.select(selectUser)),
      mergeMap(([{ flavorId }, user]) =>
        from(
          this.userService.updateUser(user!.id, {
            likedFlavors: user?.likedFlavors.filter(
              (likedFlavorId) => likedFlavorId !== flavorId
            ),
          })
        ).pipe(
          map(() => AuthActions.DISLIKE_FLAVOR_SUCCESS({ flavorId })),
          catchError((error) =>
            of(AuthActions.DISLIKE_FLAVOR_FAILURE({ error: error.message }))
          )
        )
      )
    )
  );

  onAuthChange$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.LOGIN_USER,
          AuthActions.LOGIN_USER_FAILURE,
          AuthActions.LOGIN_USER_SUCCESS,
          AuthActions.LOGOUT_USER,
          AuthActions.LOGOUT_USER_SUCCESS,
          AuthActions.LOGOUT_USER_FAILURE,
          AuthActions.DISLIKE_FLAVOR,
          AuthActions.DISLIKE_FLAVOR_SUCCESS,
          AuthActions.DISLIKE_FLAVOR_FAILURE,
          AuthActions.LIKE_FLAVOR,
          AuthActions.LIKE_FLAVOR_SUCCESS,
          AuthActions.LIKE_FLAVOR_FAILURE,
          AuthActions.REGISTER_USER,
          AuthActions.REGISTER_USER_SUCCESS,
          AuthActions.REGISTER_USER_FAILURE,
          AuthActions.ADD_USER_ID,
          AuthActions.SET_USER_ORDER
        ),
        tap(() => {
          this.store.dispatch(AuthActions.PUSH_AUTH_TO_LOCAL_STORAGE());
        })
      ),
    { dispatch: false }
  );
}
