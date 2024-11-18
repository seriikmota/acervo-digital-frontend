import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListItemsComponent} from "./list-items/list-items.component";
import {CrudActionEnum} from "../architecture/component/curd-action";

export enum ItemRoles {
  CREATE = "ROLE_ITEM_CREATE",
  READ = "ROLE_ITEM_READ",
  UPDATE = "ROLE_ITEM_UPDATE",
  DELETE = "ROLE_ITEM_DELETE",
  LIST_ALL = "ROLE_ITEM_LISTALL",
}

export enum ItemPaths {
  LIST = "item/list"
}

export const itemRoutes: Routes = [
  {
    path: 'item',
    component: ListItemsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ListItemsComponent,
        data: {
          crud_action: CrudActionEnum.LIST,
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(itemRoutes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
