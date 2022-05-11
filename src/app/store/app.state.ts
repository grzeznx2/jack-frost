import { AuthState } from './auth';
import { FlavorState } from './flavor';
import { OrderState } from './order';
import { StorageState } from './storage';
import { UnitState } from './unit';
import { UserState } from './user';

export interface AppState {
  users: UserState;
  flavors: FlavorState;
  orders: OrderState;
  units: UnitState;
  auth: AuthState;
  storage: StorageState;
}
