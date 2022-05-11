import { FlavorId } from '../flavor/flavor.model';
import { UnitId } from '../unit/unit.model';
import { UserId } from '../user/user.model';

export type FlavorUnitId = string;
export type OrderId = string;

export interface FlavorUnitPayload {
  flavorId: FlavorId;
  unitId: UnitId;
  amount: number;
}

export interface FlavorUnit extends FlavorUnitPayload {
  id: FlavorUnitId;
}

export interface OrderPayload {
  userId: UserId;
  createdAt: Date;
  flavorUnits: FlavorUnitPayload[];
}

export interface OrderDB extends OrderPayload {
  id: FlavorUnitId;
}
