import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CrudActionEnum} from "../architecture/component/curd-action";
import {ListPostComponent} from "./list-post/list-post.component";

export enum postRoles {
  CREATE = "ROLE_ITEM_CREATE",
  READ = "ROLE_ITEM_READ",
  UPDATE = "ROLE_ITEM_UPDATE",
  DELETE = "ROLE_ITEM_DELETE",
  LIST_ALL = "ROLE_ITEM_LISTALL",
}

export enum postPaths {
  LIST = "post/list"
}

export const postRoutes: Routes = [
  {
    path: 'post',
    component: ListPostComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component:ListPostComponent ,
        data: {
          crud_action: CrudActionEnum.LIST,
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(postRoutes)],
  exports: [RouterModule]
})
export class PostRoutingModule {
}
