import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListUserComponent} from "./list-user/list-user.component";
import {ListItemsComponent} from "./list-items/list-items.component";
import {SecurityGuard} from "./security/security.guard";
import {AuthenticationRoutes} from "./security/authentication/authentication.routing";
import {ListLogComponent} from "./list-log/list-log.component";
import {AboutComponent} from "./about/about.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'acesso/login',
    pathMatch: 'full'
  },
  {
    path: 'items',
    component: ListItemsComponent,
    canActivate: [SecurityGuard],
    data: {
      security: {
        roles: [
          'ROLE_USER_CREATE',
          'ROLE_USER_READ',
          'ROLE_USER_UPDATE',
          'ROLE_USER_DELETE',
          'ROLE_USER_LISTALL',
          'ROLE_ITEM_CREATE',
          'ROLE_ITEM_READ',
          'ROLE_ITEM_UPDATE',
          'ROLE_ITEM_DELETE',
          'ROLE_ITEM_LISTALL'
        ]
      }
    }
  },
  {
    path: 'user',
    component: ListUserComponent,
    canActivate: [SecurityGuard],
    data: {
      security: {
        roles: [
          'ROLE_USER_CREATE',
          'ROLE_USER_READ',
          'ROLE_USER_UPDATE',
          'ROLE_USER_DELETE',
          'ROLE_USER_LISTALL',
          'ROLE_ITEM_CREATE',
          'ROLE_ITEM_READ',
          'ROLE_ITEM_UPDATE',
          'ROLE_ITEM_DELETE',
          'ROLE_ITEM_LISTALL'
        ]
      }
    }
  },
  {
    path: 'log',
    component: ListLogComponent,
    canActivate: [SecurityGuard],
    data: {
      security: {
        roles: [
          'ROLE_USER_CREATE',
          'ROLE_USER_READ',
          'ROLE_USER_UPDATE',
          'ROLE_USER_DELETE',
          'ROLE_USER_LISTALL',
          'ROLE_ITEM_CREATE',
          'ROLE_ITEM_READ',
          'ROLE_ITEM_UPDATE',
          'ROLE_ITEM_DELETE',
          'ROLE_ITEM_LISTALL'
        ]
      }
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [SecurityGuard],
    data: {
      security: {
        roles: [
          'ROLE_USER_CREATE',
          'ROLE_USER_READ',
          'ROLE_USER_UPDATE',
          'ROLE_USER_DELETE',
          'ROLE_USER_LISTALL',
          'ROLE_ITEM_CREATE',
          'ROLE_ITEM_READ',
          'ROLE_ITEM_UPDATE',
          'ROLE_ITEM_DELETE',
          'ROLE_ITEM_LISTALL'
        ]
      }
    }
  },
  {
    path: 'acesso',
    children: [
      ...AuthenticationRoutes
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
