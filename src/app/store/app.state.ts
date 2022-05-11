import { FlavorState } from './flavor';
import { UserState } from './user';

export interface AppState {
  users: UserState;
  flavors: FlavorState;
}
