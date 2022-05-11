import { createReducer, on } from '@ngrx/store';
import { StorageActions } from './storage.actions';

export interface StorageState {
  items: string[];
}

export const initialState: StorageState = {
  items: [],
};

export const storageReducer = createReducer(
  initialState,
  on(StorageActions.SET_ITEM, (state, { key }) => ({
    ...state,
    items: [...new Set<string>([...state.items, key])],
  })),
  on(StorageActions.CLEAR_STORAGE, (state) => ({
    ...state,
    ...initialState,
  }))
);
