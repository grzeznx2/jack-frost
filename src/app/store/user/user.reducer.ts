import { createReducer, on } from '@ngrx/store';
import { User, UserId } from 'src/app/features/user/user.model';
import { UserActions } from './user.actions';
export interface UserState {
  loading: boolean;
  error: string | null;
  idList: string[];
  byIds: { [key: UserId]: User };
}

export const initialState: UserState = {
  loading: false,
  error: null,
  idList: [],
  byIds: {},
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.ADD_USER, (state) => ({
    ...state,
    // TODO: zlikwidować możliwość wkładania duplikatów
    // TODO: zrobić oddzielne stany ładowania?????
    // loading: true,
    error: null,
  })),
  on(
    UserActions.ADD_USER_SUCCESS,
    (state, { user: { id, ...restUserData } }) => ({
      ...state,
      loading: false,
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
    loading: false,
    error,
  })),
  on(UserActions.FETCH_USERS, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.FETCH_USERS_SUCCESS, (state, { users }) => {
    let idList: UserState['idList'] = [];
    let byIds: UserState['byIds'] = {};

    for (const user of users) {
      idList.push(user.id);
      byIds[user.id] = user;
    }

    return { ...state, loading: false, error: null, byIds, idList };
  }),
  on(UserActions.FETCH_USERS_FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UserActions.DELETE_USER, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.DELETE_USER_SUCCESS, (state, { id: idToDelete }) => {
    const { [idToDelete]: userToRemove, ...restUsers } = state.byIds;
    // console.log(id);
    return {
      ...state,
      error: null,
      loading: false,
      idList: state.idList.filter((id) => id !== idToDelete),
      byIds: { ...restUsers },
    };
  }),
  on(UserActions.DELETE_USER_FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
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
