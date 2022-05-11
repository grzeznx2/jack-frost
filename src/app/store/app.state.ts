import { FlavorState } from './flavor';
import { OrderState } from './order';
import { UserState } from './user';

export interface AppState {
  users: UserState;
  flavors: FlavorState;
  orders: OrderState;
}
