import { createAction, props } from '@ngrx/store';
import { FlavorId } from 'src/app/features/flavor/flavor.model';
import { CreateUser, User, UserId } from 'src/app/features/user/user.model';
import { UserState } from './user.reducer';

const REDUCER = '[User]';

export const UserActions = {
  ADD_USER: createAction(`${REDUCER} Add User`, props<{ user: CreateUser }>()),
  ADD_USER_SUCCESS: createAction(
    `${REDUCER} Add User Success`,
    props<{ user: User }>()
  ),
  ADD_USER_FAILURE: createAction(
    `${REDUCER} Add User Failure`,
    props<{ error: string }>()
  ),
  FETCH_USERS: createAction(`${REDUCER} Fetch Users`),
  FETCH_USERS_SUCCESS: createAction(
    `${REDUCER} Fetch Users Sucess`,
    props<{ users: User[] }>()
  ),
  FETCH_USERS_FAILURE: createAction(
    `${REDUCER} Fetch Users Failure`,
    props<{ error: string }>()
  ),
  DELETE_USER: createAction(`${REDUCER} Delete User`, props<{ id: UserId }>()),
  DELETE_USER_SUCCESS: createAction(
    `${REDUCER} Delete User Success`,
    props<{ id: UserId }>()
  ),
  DELETE_USER_FAILURE: createAction(
    `${REDUCER} Delete User Failure`,
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

  CLEAR_USER_STATE: createAction(`${REDUCER} Clear User State`),
  PUSH_USER_STATE_TO_LOCAL_STORAGE: createAction(
    `${REDUCER} Push User State To Local Storage`
  ),
  SET_USER_STATE: createAction(
    `${REDUCER} Set User State`,
    props<{ state: UserState }>()
  ),
};
