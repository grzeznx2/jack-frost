import { UserId } from 'src/app/features/user/user.model';
import { AppState } from '../app.state';

export const selectUsers = (state: AppState) => state.users;
export const selectUsersLoading = (state: AppState) => state.users.loading;
export const selectUsersError = (state: AppState) => state.users.error;
export const selectUsersList = (state: AppState) => {
  const { idList, byIds } = state.users;
  return idList.map((id) => byIds[id]).filter((user) => user.role !== 'ADMIN');
};
export const selectDeleteUserLoading = (id: UserId) => (state: AppState) => {
  return state.users.loading.delete[id];
};
