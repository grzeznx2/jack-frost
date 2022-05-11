import { createAction, props } from '@ngrx/store';
import { Unit, UnitId, UnitWithId } from 'src/app/features/unit/unit.model';
import { UnitState } from './unit.reducer';

const REDUCER = '[Unit]';

export const UnitActions = {
  ADD_UNIT: createAction(`${REDUCER} Add Unit`, props<{ unit: Unit }>()),
  ADD_UNIT_SUCCESS: createAction(
    `${REDUCER} Add Unit Success`,
    props<{ unit: UnitWithId }>()
  ),
  ADD_UNIT_FAILURE: createAction(
    `${REDUCER} Add Unit Failure`,
    props<{ error: string }>()
  ),
  FETCH_UNITS: createAction(`${REDUCER} Fetch Units`),
  FETCH_UNITS_SUCCESS: createAction(
    `${REDUCER} Fetch Units Sucess`,
    props<{ unitsWithId: UnitWithId[] }>()
  ),
  FETCH_UNITS_FAILURE: createAction(
    `${REDUCER} Fetch Units Failure`,
    props<{ error: string }>()
  ),
  DELETE_UNIT: createAction(`${REDUCER} Delete Unit`, props<{ id: UnitId }>()),
  DELETE_UNIT_SUCCESS: createAction(
    `${REDUCER} Delete Unit Success`,
    props<{ id: UnitId }>()
  ),
  DELETE_UNIT_FAILURE: createAction(
    `${REDUCER} Delete Unit Failure`,
    props<{ error: string }>()
  ),

  CLEAR_UNIT_STATE: createAction(`${REDUCER} Clear Unit State`),
  PUSH_UNIT_STATE_TO_LOCAL_STORAGE: createAction(
    `${REDUCER} Push Unit State To Local Storage`
  ),
  SET_UNIT_STATE: createAction(
    `${REDUCER} Set Unit State`,
    props<{ state: UnitState }>()
  ),
};
