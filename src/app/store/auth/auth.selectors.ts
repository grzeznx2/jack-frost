import { AppState } from '../app.state';

export const selectAuth = (state: AppState) => state.auth;
export const selectUser = (state: AppState) => state.auth.user;
export const selectUserId = (state: AppState) => state.auth.user?.id;
export const selectUserRole = (state: AppState) => state.auth.user?.role;
export const selectAuthLoading = (state: AppState) => state.auth.loading;
export const selectAuthError = (state: AppState) => state.auth.error;
export const selectLoggedIn = (state: AppState) => state.auth.loggedIn;
export const selectLikedFlavors = (state: AppState) =>
  state.auth.user?.likedFlavors;
