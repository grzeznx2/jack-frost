import { createAction, props } from '@ngrx/store';
import {
  FlavorUnitId,
  FlavorUnitPayload,
  OrderDB,
} from 'src/app/features/order/order.model';
import { UserId } from 'src/app/features/user/user.model';
import { OrderState } from './order.reducer';

const REDUCER = '[Order]';

export const OrderActions = {
  ADD_FLAVOR_UNIT: createAction(
    `${REDUCER} Add Flavor Unit`,
    props<{ flavorUnit: FlavorUnitPayload }>()
  ),
  DELETE_FLAVOR_UNIT: createAction(
    `${REDUCER} Delete Flavor Unit`,
    props<{ flavorUnitId: FlavorUnitId }>()
  ),
  UPDATE_AMOUNT_FLAVOR_UNIT: createAction(
    `${REDUCER} Update Amount Flavor Unit`,
    props<{ flavorUnitId: FlavorUnitId; amount: number }>()
  ),
  ADD_ORDER: createAction(`${REDUCER} Add Order`),

  ADD_ORDER_SUCCESS: createAction(
    `${REDUCER} Add Order Success`,
    props<{ order: OrderDB }>()
  ),
  ADD_ORDER_FAILURE: createAction(
    `${REDUCER} Add Order Failure`,
    props<{ error: string }>()
  ),
  FETCH_ORDERS: createAction(`${REDUCER} Fetch Orders`),

  FETCH_ORDERS_SUCCESS: createAction(
    `${REDUCER} Fetch Orders Success`,
    props<{ orders: OrderDB[] }>()
  ),
  FETCH_ORDERS_FAILURE: createAction(
    `${REDUCER} Fetch Orders Failure`,
    props<{ error: string }>()
  ),
  SET_LAST_USER_ORDER: createAction(
    `${REDUCER} Set Last User Order`,
    props<{ order: OrderDB | null }>()
  ),
  REPEAT_LAST_USER_ORDER: createAction(`${REDUCER} Repeat Last User Order`),
  REPEAT_LAST_USER_ORDER_SUCCESS: createAction(
    `${REDUCER} Repeat Last User Order Success`
  ),
  CLEAR_ORDER_STATE: createAction(`${REDUCER} Clear Order State`),
  FETCH_LAST_USER_ORDER: createAction(
    `${REDUCER} Fetch Last User Order`,
    props<{ userId: UserId }>()
  ),

  FETCH_LAST_USER_ORDER_SUCCESS: createAction(
    `${REDUCER} Fetch Last User Order Success`,
    props<{ order: OrderDB }>()
  ),
  FETCH_LAST_USER_ORDER_FAILURE: createAction(
    `${REDUCER} Fetch Last User Order Failure`,
    props<{ error: string }>()
  ),

  PUSH_ORDER_STATE_TO_LOCAL_STORAGE: createAction(
    `${REDUCER} Push Order State To Local Storage`
  ),
  SET_ORDER_STATE: createAction(
    `${REDUCER} Set Order State`,
    props<{ state: OrderState }>()
  ),
};
