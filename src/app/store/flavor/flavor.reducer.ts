import { createReducer, on } from '@ngrx/store';
import { FlavorId, FlavorWithId } from 'src/app/features/flavor/flavor.model';
import { FlavorActions } from './flavor.actions';

export interface FlavorState {
  loading: {
    add: boolean;
    delete: {
      [key: FlavorId]: boolean;
    };
    fetch: boolean;
  };
  error: string | null;
  idList: string[];
  byIds: { [key: FlavorId]: FlavorWithId };
}

export const initialState: FlavorState = {
  loading: {
    add: false,
    delete: {},
    fetch: false,
  },
  error: null,
  idList: [],
  byIds: {},
};

export const flavorReducer = createReducer(
  initialState,
  on(FlavorActions.ADD_FLAVOR, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      add: true,
    },
    error: null,
  })),
  on(FlavorActions.ADD_FLAVOR_SUCCESS, (state, { flavor: { name, id } }) => ({
    ...state,
    loading: {
      ...state.loading,
      add: false,
    },
    error: null,
    idList: [...state.idList, id],
    byIds: {
      ...state.byIds,
      [id]: { id, name },
    },
  })),
  on(FlavorActions.ADD_FLAVOR_FAILURE, (state, { error }) => ({
    ...state,
    loading: {
      ...state.loading,
      add: false,
    },
    error,
  })),
  on(FlavorActions.FETCH_FLAVORS, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      fetch: true,
    },
    error: null,
  })),
  on(FlavorActions.FETCH_FLAVORS_SUCCESS, (state, { flavorsWithId }) => {
    let idList: FlavorState['idList'] = [];
    let byIds: FlavorState['byIds'] = {};

    for (const flavor of flavorsWithId) {
      idList.push(flavor.id);
      byIds[flavor.id] = flavor;
    }

    return {
      ...state,
      loading: { ...initialState.loading },
      error: null,
      byIds,
      idList,
    };
  }),
  on(FlavorActions.FETCH_FLAVORS_FAILURE, (state, { error }) => ({
    ...state,
    loading: {
      ...initialState.loading,
    },
    error,
  })),
  on(FlavorActions.DELETE_FLAVOR, (state, { id }) => ({
    ...state,
    loading: {
      ...state.loading,
      delete: {
        ...state.loading.delete,
        [id]: true,
      },
    },
    error: null,
  })),
  on(FlavorActions.DELETE_FLAVOR_SUCCESS, (state, { id: idToDelete }) => {
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
  on(FlavorActions.DELETE_FLAVOR_FAILURE, (state, { error }) => ({
    ...state,
    loading: {
      ...initialState.loading,
    },
    error,
  })),
  on(FlavorActions.CLEAR_FLAVOR_STATE, (state) => ({
    ...state,
    ...initialState,
  })),

  on(FlavorActions.SET_FLAVOR_STATE, (_, { state }) => ({
    ...state,
  }))
);
