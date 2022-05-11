import { createReducer, on } from '@ngrx/store';
import {
  FlavorUnit,
  FlavorUnitId,
  OrderDB,
  OrderId,
} from 'src/app/features/order/order.model';
import { OrderActions } from './order.actions';

export interface OrderState {
  current: {
    flavorUnitIdList: FlavorUnitId[];
    byFlavorUnitId: {
      [key: FlavorUnitId]: FlavorUnit;
    };
  };
  all: {
    idList: OrderId[];
    byIds: {
      [key: OrderId]: OrderDB;
    };
    loading: boolean;
    error: string | null;
  };
  lastUserOrder: OrderDB | null;
}

export const initialState: OrderState = {
  current: {
    flavorUnitIdList: [],
    byFlavorUnitId: {},
  },
  all: {
    idList: [],
    byIds: {},
    loading: false,
    error: null,
  },
  lastUserOrder: null,
};

export const orderReducer = createReducer(
  initialState,
  on(OrderActions.ADD_FLAVOR_UNIT, (state, { flavorUnit }) => {
    const { flavorId, unitId, amount } = flavorUnit;

    const flavorUnitId = flavorId + unitId;

    if (state.current.byFlavorUnitId[flavorUnitId]) {
      return {
        ...state,
        current: {
          ...state.current,
          byFlavorUnitId: {
            ...state.current.byFlavorUnitId,
            [flavorUnitId]: {
              ...state.current.byFlavorUnitId[flavorUnitId],
              amount:
                state.current.byFlavorUnitId[flavorUnitId].amount + amount,
            },
          },
        },
      };
    } else {
      return {
        ...state,
        current: {
          ...state.current,
          flavorUnitIdList: [...state.current.flavorUnitIdList, flavorUnitId],
          byFlavorUnitId: {
            ...state.current.byFlavorUnitId,
            [flavorUnitId]: {
              id: flavorUnitId,
              flavorId,
              unitId,
              amount,
            },
          },
        },
      };
    }
  }),
  on(
    OrderActions.UPDATE_AMOUNT_FLAVOR_UNIT,
    (state, { flavorUnitId, amount }) => {
      return {
        ...state,
        current: {
          ...state.current,
          byFlavorUnitId: {
            ...state.current.byFlavorUnitId,
            [flavorUnitId]: {
              ...state.current.byFlavorUnitId[flavorUnitId],
              amount,
            },
          },
        },
      };
    }
  ),
  on(OrderActions.DELETE_FLAVOR_UNIT, (state, { flavorUnitId }) => {
    const { [flavorUnitId]: idToRemove, ...rest } =
      state.current.byFlavorUnitId;

    return {
      ...state,
      current: {
        ...state.current,
        flavorUnitIdList: state.current.flavorUnitIdList.filter(
          (id) => id !== flavorUnitId
        ),
        byFlavorUnitId: {
          ...rest,
        },
      },
    };
  }),
  on(OrderActions.FETCH_ORDERS, (state) => {
    return {
      ...state,
      all: {
        ...state.all,
        loading: true,
        error: null,
      },
    };
  }),
  on(OrderActions.FETCH_ORDERS_SUCCESS, (state, { orders }) => {
    let idList: OrderState['all']['idList'] = [];
    let byIds: OrderState['all']['byIds'] = {};

    for (const order of orders) {
      idList.push(order.id);
      byIds[order.id] = order;
    }

    return {
      ...state,
      all: {
        ...state.all,
        loading: false,
        error: null,
        idList,
        byIds,
      },
    };
  }),
  on(OrderActions.SET_LAST_USER_ORDER, (state, { order }) => {
    return {
      ...state,
      lastUserOrder: order,
    };
  }),
  on(OrderActions.CLEAR_ORDER_STATE, (state) => {
    return {
      ...state,
      ...initialState,
    };
  }),
  on(OrderActions.SET_ORDER_STATE, (_, { state }) => {
    return {
      ...state,
    };
  })
  // on(OrderActions.REPEAT_LAST_USER_ORDER, (state) => {
  //   return {
  //     ...state,
  //   };
  // })
  // on(OrderActions.REPEAT_LAST_USER_ORDER, (state) => {
  //   const { lastUserOrder } = state;
  //   if (!lastUserOrder) return { ...state };
  //   const { flavorUnits } = lastUserOrder;
  //   return { ...state };
  // })
);
