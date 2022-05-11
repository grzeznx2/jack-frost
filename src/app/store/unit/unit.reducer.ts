import { createReducer, on } from '@ngrx/store';
import { UnitId, UnitWithId } from 'src/app/features/unit/unit.model';
import { UnitActions } from './unit.actions';

export interface UnitState {
  loading: {
    add: boolean;
    delete: {
      [key: UnitId]: boolean;
    };
    fetch: boolean;
  };
  error: string | null;
  idList: string[];
  byIds: { [key: UnitId]: UnitWithId };
}

export const initialState: UnitState = {
  loading: {
    add: false,
    delete: {},
    fetch: false,
  },
  error: null,
  idList: [],
  byIds: {},
};

export const unitReducer = createReducer(
  initialState,
  on(UnitActions.ADD_UNIT, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      add: true,
    },
    error: null,
  })),
  on(UnitActions.ADD_UNIT_SUCCESS, (state, { unit: { name, id, weight } }) => ({
    ...state,
    loading: {
      ...initialState.loading,
    },
    error: null,
    idList: [...state.idList, id],
    byIds: {
      ...state.byIds,
      [id]: { id, name, weight },
    },
  })),
  on(UnitActions.ADD_UNIT_FAILURE, (state, { error }) => ({
    ...state,
    loading: {
      ...initialState.loading,
    },
    error,
  })),
  on(UnitActions.FETCH_UNITS, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      fetch: true,
    },
    error: null,
  })),
  on(UnitActions.FETCH_UNITS_SUCCESS, (state, { unitsWithId }) => {
    let idList: UnitState['idList'] = [];
    let byIds: UnitState['byIds'] = {};

    for (const flavor of unitsWithId) {
      idList.push(flavor.id);
      byIds[flavor.id] = flavor;
    }

    return {
      ...state,
      loading: {
        ...initialState.loading,
      },
      error: null,
      byIds,
      idList,
    };
  }),
  on(UnitActions.FETCH_UNITS_FAILURE, (state, { error }) => ({
    ...state,
    loading: {
      ...initialState.loading,
    },
    error,
  })),
  on(UnitActions.DELETE_UNIT, (state, { id }) => {
    console.log('FROM UNIT REDUCER ');
    console.log(id);

    return {
      ...state,
      loading: {
        ...state.loading,
        delete: {
          ...state.loading.delete,
          [id]: true,
        },
      },
      error: null,
    };
  }),
  on(UnitActions.DELETE_UNIT_SUCCESS, (state, { id: idToDelete }) => {
    const { [idToDelete]: flavorToRemove, ...restFlavors } = state.byIds;
    return {
      ...state,
      error: null,
      loading: {
        ...initialState.loading,
      },
      idList: state.idList.filter((id) => id !== idToDelete),
      byIds: { ...restFlavors },
    };
  }),
  on(UnitActions.DELETE_UNIT_FAILURE, (state, { error }) => ({
    ...state,
    loading: {
      ...initialState.loading,
    },
    error,
  })),
  on(UnitActions.CLEAR_UNIT_STATE, (state) => ({
    ...state,
    ...initialState,
  })),
  on(UnitActions.SET_UNIT_STATE, (_, { state }) => ({
    ...state,
  }))
);
