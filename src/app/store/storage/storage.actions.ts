import { createAction, props } from '@ngrx/store';
import { AppState } from '../app.state';

const REDUCER = '[Storage]';

export const StorageActions = {
  SET_ITEM: createAction(
    `${REDUCER} Set Item `,
    props<{ key: keyof AppState; payload: any }>()
  ),
  REHYDRATE: createAction(`${REDUCER} Rehydrate `),
  CLEAR_STORAGE: createAction(`${REDUCER} Clear Storage `),
};
