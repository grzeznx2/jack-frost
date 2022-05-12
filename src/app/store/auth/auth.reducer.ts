import { createReducer, on } from '@ngrx/store';
import { UserAfterRegister } from 'src/app/features/user/user.model';
import { AuthActions } from './auth.actions';

export interface AuthState {
  loggedIn: boolean;
  user: UserAfterRegister | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AuthState = {
  loggedIn: false,
  user: null,
  loading: false,
  error: null,
  success: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.REGISTER_USER, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.REGISTER_USER_SUCCESS, (state, { user }) => ({
    ...state,
    loading: false,
    error: null,
    success: true,
    loggedIn: true,
    user,
  })),
  on(AuthActions.REGISTER_USER_FAILURE, (state, { error }) => {
    /*
    TODO:
    Znaleźć przyczynę, dlaczego Firebase wyrzuca ten błąd, nawet jeżeli email nie jest w użyciu
    */
    if (
      error ===
      'Firebase: The email address is already in use by another account. (auth/email-already-in-use).'
    ) {
      return {
        ...state,
        loading: false,
      };
    }

    return { ...state, loading: false, error, success: false };
  }),
  on(AuthActions.LOGIN_USER, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.LOGIN_USER_SUCCESS, (state, { user }) => ({
    ...state,
    loading: false,
    error: null,
    success: true,
    loggedIn: true,
    user,
  })),
  on(AuthActions.LOGIN_USER_FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: false,
  })),
  on(AuthActions.LIKE_FLAVOR_SUCCESS, (state, { flavorId }) => {
    if (state.user) {
      return {
        ...state,
        user: {
          ...state.user,
          likedFlavors: [...state.user.likedFlavors, flavorId],
        },
      };
    }
    return state;
  }),
  on(AuthActions.DISLIKE_FLAVOR_SUCCESS, (state, { flavorId }) => {
    if (state.user) {
      return {
        ...state,
        user: {
          ...state.user,
          likedFlavors: state.user.likedFlavors.filter(
            (likedFlavorId) => likedFlavorId !== flavorId
          ),
        },
      };
    }
    return state;
  }),
  on(AuthActions.LOGOUT_USER, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.LOGOUT_USER_SUCCESS, (state) => ({
    ...state,
    ...initialState,
  })),
  on(AuthActions.LOGOUT_USER_FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AuthActions.SET_USER_ORDER, (state, { lastOrder }) => ({
    ...state,
    user: {
      ...state.user!,
      lastOrder,
    },
  })),
  on(AuthActions.SET_AUTH_STATE, (state, { authState }) => ({
    ...state,
    ...authState,
  }))
);
