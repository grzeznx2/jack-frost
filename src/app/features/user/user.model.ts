import { FlavorId } from '../flavor/flavor.model';
import { OrderId } from '../order/order.model';

export type UserId = string;

export type Role = 'USER' | 'ADMIN';

export interface UserCredentials {
  email: string;
  password: string;
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  password: string;
}

export interface RegisterUser extends CreateUser {
  email: string;
}

export interface UserPayload extends RegisterUser {
  hasActivatedAccount: boolean;
  likedFlavors: FlavorId[];
  role: Role;
}

export interface User extends UserPayload {
  id: UserId;
}

export interface UserAfterRegister {
  firstName: string;
  lastName: string;
  email: string;
  hasActivatedAccount: boolean;
  role: Role;
  id: UserId;
  likedFlavors: FlavorId[];
  lastOrder: {
    id: OrderId;
    createdAt: Date | { seconds: number; nanoseconds: number };
  } | null;
}
