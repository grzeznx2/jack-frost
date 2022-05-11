import { createAction, props } from '@ngrx/store';
import {
  Flavor,
  FlavorId,
  FlavorWithId,
} from 'src/app/features/flavor/flavor.model';
import { FlavorState } from './flavor.reducer';

const REDUCER = '[Flavor]';

export const FlavorActions = {
  ADD_FLAVOR: createAction(
    `${REDUCER} Add Flavor`,
    props<{ flavor: Flavor }>()
  ),
  ADD_FLAVOR_SUCCESS: createAction(
    `${REDUCER} Add Flavor Success`,
    props<{ flavor: FlavorWithId }>()
  ),
  ADD_FLAVOR_FAILURE: createAction(
    `${REDUCER} Add Flavor Failure`,
    props<{ error: string }>()
  ),
  FETCH_FLAVORS: createAction(`${REDUCER} Fetch Flavors`),
  FETCH_FLAVORS_SUCCESS: createAction(
    `${REDUCER} Fetch Flavors Sucess`,
    props<{ flavorsWithId: FlavorWithId[] }>()
  ),
  FETCH_FLAVORS_FAILURE: createAction(
    `${REDUCER} Fetch Flavors Failure`,
    props<{ error: string }>()
  ),
  DELETE_FLAVOR: createAction(
    `${REDUCER} Delete Flavor`,
    props<{ id: FlavorId }>()
  ),
  DELETE_FLAVOR_SUCCESS: createAction(
    `${REDUCER} Delete Flavor Success`,
    props<{ id: FlavorId }>()
  ),
  DELETE_FLAVOR_FAILURE: createAction(
    `${REDUCER} Delete Flavor Failure`,
    props<{ error: string }>()
  ),

  CLEAR_FLAVOR_STATE: createAction(`${REDUCER} Clear Flavor State`),

  PUSH_FLAVOR_STATE_TO_LOCAL_STORAGE: createAction(
    `${REDUCER} Push Flavor State To Local Storage`
  ),
  SET_FLAVOR_STATE: createAction(
    `${REDUCER} Set Flavor State`,
    props<{ state: FlavorState }>()
  ),
};
