import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CrudActionEnum} from "../architecture/component/curd-action";
import {ListPostComponent} from "./list-post/list-post.component";
import {TablePostComponent} from "./table-post/table-post.component";

export enum postRoles {
  CREATE = "ROLE_POST_CREATE",
  READ = "ROLE_POST_READ",
  UPDATE = "ROLE_POST_UPDATE",
  DELETE = "ROLE_POST_DELETE",
  LIST_ALL = "ROLE_POST_LISTALL",
  LIST_TABLE_ALL="ROLE_POST_TABLE_ALL"
}

export enum postPaths {
  LIST = "post/list"
}
export enum postTablePaths {
  LIST_TABLE = "post/table"
}

export const postRoutes: Routes = [
  {
    path: 'post',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: ListPostComponent,
        data: {
          crud_action: CrudActionEnum.LIST,
        },
      },
      {
        path: 'table',
        component: TablePostComponent,
        data: {
          security: {roles: [postRoles.LIST_TABLE_ALL]},
          crud_action: CrudActionEnum.LIST
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(postRoutes)],
  exports: [RouterModule]
})
export class PostRoutingModule {
}
