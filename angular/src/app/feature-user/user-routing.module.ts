import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SecurityGuard} from "../architecture/security/security.guard";
import {CrudActionEnum} from "../architecture/component/curd-action";
import {ListLogComponent} from "./list-log/list-log.component";
import {ListUserComponent} from "./list-user/list-user.component";

export enum UserRoles {
  CREATE = "ROLE_USER_CREATE",
  READ = "ROLE_USER_READ",
  UPDATE = "ROLE_USER_UPDATE",
  DELETE = "ROLE_USER_DELETE",
  LIST_ALL = "ROLE_USER_LISTALL",
  LIST_LOG = "ROLE_USER_LOG_LISTALL",
  LIST_TABLE_ALL="ROLE_POST_TABLE_ALL"
}

export enum UserPaths {
  LIST = "user/list",
  LIST_LOG = "user/log",
}

export const userRoutes: Routes = [
  {
    path: 'user',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ListUserComponent,
        canActivate: [SecurityGuard],
        data: {
          security: {roles: [UserRoles.LIST_ALL]},
          crud_action: CrudActionEnum.LIST,
        }
      },
      {
        path: 'log',
        component: ListLogComponent,
        canActivate: [SecurityGuard],
        data: {
          security: {roles: [UserRoles.LIST_LOG]},
          crud_action: CrudActionEnum.LIST,
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
