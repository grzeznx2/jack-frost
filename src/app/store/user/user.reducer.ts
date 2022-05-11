import { createReducer, on } from '@ngrx/store';
import { User, UserId } from 'src/app/features/user/user.model';
import { UserActions } from './user.actions';
export interface UserState {
  loading: {
    add: boolean;
    delete: {
      [key: UserId]: boolean;
    };
    fetch: boolean;
  };
  error: string | null;
  idList: string[];
  byIds: { [key: UserId]: User };
}

export const initialState: UserState = {
  loading: {
    add: false,
    delete: {},
    fetch: false,
  },
  error: null,
  idList: [],
  byIds: {},
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.ADD_USER, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      add: true,
    },
    error: null,
  })),
  on(
    UserActions.ADD_USER_SUCCESS,
    (state, { user: { id, ...restUserData } }) => ({
      ...state,
      loading: {
        ...initialState.loading,
      },
      error: null,
      idList: [...state.idList, id],
      byIds: {
        ...state.byIds,
        [id]: { id, ...restUserData },
      },
    })
  ),
  on(UserActions.ADD_USER_FAILURE, (state, { error }) => ({
    ...state,
    loading: {
      ...initialState.loading,
    },
    error,
  })),
  on(UserActions.FETCH_USERS, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      fetch: true,
    },
    error: null,
  })),
  on(UserActions.FETCH_USERS_SUCCESS, (state, { users }) => {
    let idList: UserState['idList'] = [];
    let byIds: UserState['byIds'] = {};

    for (const user of users) {
      idList.push(user.id);
      byIds[user.id] = user;
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
  on(UserActions.FETCH_USERS_FAILURE, (state, { error }) => ({
    ...state,
    loading: {
      ...initialState.loading,
    },
    error,
  })),
  on(UserActions.DELETE_USER, (state, { id }) => ({
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
  on(UserActions.DELETE_USER_SUCCESS, (state, { id: idToDelete }) => {
    const { [idToDelete]: userToRemove, ...restUsers } = state.byIds;
    return {
      ...state,
      error: null,
      loading: {
        ...initialState.loading,
      },
      idList: state.idList.filter((id) => id !== idToDelete),
      byIds: { ...restUsers },
    };
  }),
  on(UserActions.DELETE_USER_FAILURE, (state, { error }) => ({
    ...state,
    loading: {
      ...initialState.loading,
    },
    error,
  })),
  on(UserActions.CLEAR_USER_STATE, (state) => ({
    ...state,
    ...initialState,
  })),
  on(UserActions.SET_USER_STATE, (_, { state }) => ({
    ...state,
  }))
);
