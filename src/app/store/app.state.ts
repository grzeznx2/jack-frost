import { FlavorState } from './flavor';
import { OrderState } from './order';
import { UnitState } from './unit';
import { UserState } from './user';

export interface AppState {
  users: UserState;
  flavors: FlavorState;
  orders: OrderState;
  units: UnitState;
}
