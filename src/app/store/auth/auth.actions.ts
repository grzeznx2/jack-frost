import { createAction, props } from '@ngrx/store';
import { FlavorId } from 'src/app/features/flavor/flavor.model';
import { OrderId } from 'src/app/features/order/order.model';
import {
  RegisterUser,
  UserAfterRegister,
  UserCredentials,
} from 'src/app/features/user/user.model';
import { AuthState } from './auth.reducer';

const REDUCER = '[Auth]';

export const AuthActions = {
  REGISTER_USER: createAction(
    `${REDUCER} Register User`,
    props<{ user: RegisterUser }>()
  ),
  REGISTER_USER_SUCCESS: createAction(
    `${REDUCER} Register User Success`,
    props<{ user: UserAfterRegister }>()
  ),
  REGISTER_USER_FAILURE: createAction(
    `${REDUCER} Register User Failure`,
    props<{ error: string }>()
  ),
  LOGIN_USER: createAction(
    `${REDUCER} Login User`,
    props<{ user: UserCredentials }>()
  ),
  LOGIN_USER_SUCCESS: createAction(
    `${REDUCER} Login User Success`,
    props<{ user: UserAfterRegister }>()
  ),
  LOGIN_USER_FAILURE: createAction(
    `${REDUCER} Login User Failure`,
    props<{ error: string }>()
  ),
  LOGOUT_USER: createAction(`${REDUCER} Logout User`),
  LOGOUT_USER_SUCCESS: createAction(`${REDUCER} Logout User Success`),
  LOGOUT_USER_FAILURE: createAction(
    `${REDUCER} Logout User Failure`,
    props<{ error: string }>()
  ),
  LIKE_FLAVOR: createAction(
    `${REDUCER} Like Flavor`,
    props<{ flavorId: FlavorId }>()
  ),
  LIKE_FLAVOR_SUCCESS: createAction(
    `${REDUCER} Like Flavor Success`,
    props<{ flavorId: FlavorId }>()
  ),
  LIKE_FLAVOR_FAILURE: createAction(
    `${REDUCER} Like Flavor Failure`,
    props<{ error: string }>()
  ),
  DISLIKE_FLAVOR: createAction(
    `${REDUCER} Dislike Flavor`,
    props<{ flavorId: FlavorId }>()
  ),
  DISLIKE_FLAVOR_SUCCESS: createAction(
    `${REDUCER} Dislike Flavor Success`,
    props<{ flavorId: FlavorId }>()
  ),
  DISLIKE_FLAVOR_FAILURE: createAction(
    `${REDUCER} Dislike Flavor Failure`,
    props<{ error: string }>()
  ),
  ADD_USER_ID: createAction(
    `${REDUCER} Add User Id`,
    props<{ payload: any }>()
  ),
  PUSH_AUTH_TO_LOCAL_STORAGE: createAction(
    `${REDUCER} Push Auth To Local Storage`
  ),
  SET_AUTH_STATE: createAction(
    `${REDUCER} Set Auth State`,
    props<{ authState: AuthState }>()
  ),
  SET_USER_ORDER: createAction(
    `${REDUCER} Set User Order`,
    props<{
      lastOrder: {
        id: OrderId;
        createdAt: { seconds: number; nanoseconds: number };
      };
    }>()
  ),
};
