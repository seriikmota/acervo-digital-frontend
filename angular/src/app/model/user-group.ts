import {Roles} from "./roles";

export interface UserGroup {
  id: number;
  name: string;
  Roles: Roles[];
}
