import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage.service';
import { AppState } from '../app.state';
import { StorageActions } from './storage.actions';

@Injectable()
export class StorageEffects {
  constructor(
    private actions$: Actions,
    private storageService: StorageService
  ) {}

  setItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StorageActions.SET_ITEM),
        tap((action) => {
          this.storageService.setItem(action.key, action.payload);
        })
      ),
    { dispatch: false }
  );

  rehydrate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StorageActions.REHYDRATE),
        tap(() => {
          this.storageService.rehydrate();
        })
      ),
    { dispatch: false }
  );

  clearStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StorageActions.CLEAR_STORAGE),
        tap(() => {
          this.storageService.clearStorage();
        })
      ),
    { dispatch: false }
  );
}
