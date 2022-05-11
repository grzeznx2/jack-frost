export type FlavorId = string;

export interface Flavor {
  name: string;
}

export interface FlavorWithId extends Flavor {
  id: FlavorId;
}
