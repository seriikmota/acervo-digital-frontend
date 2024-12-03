import {Role} from "./role";

export interface UserGroup {
  id: number;
  name: string;
  Roles: Role[];
}
