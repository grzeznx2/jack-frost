export type UnitId = string;

export interface Unit {
  name: string;
  weight: number;
}

export interface UnitWithId extends Unit {
  id: UnitId;
}
