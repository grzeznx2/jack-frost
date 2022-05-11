import { AppState } from '../app.state';

export const selectStoredItems = (state: AppState) => state.storage.items;
