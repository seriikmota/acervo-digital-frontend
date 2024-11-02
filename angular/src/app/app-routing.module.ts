import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListUserComponent} from "./list-user/list-user.component";
import {ListItemsComponent} from "./list-items/list-items.component";
import {ListLogComponent} from "./list-log/list-log.component";
import {SecurityGuard} from "./architecture/security/security.guard";
import {authenticationRoute} from "./architecture/authentication/authentication-routing.module";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login', // Redireciona para a tela de login inicialmente
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [
      ...authenticationRoute  // Rotas de autenticação, incluindo login
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'items',
        component: ListItemsComponent,
        canActivate: [SecurityGuard], // Protege esta rota
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
        canActivate: [SecurityGuard], // Protege esta rota
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
        canActivate: [SecurityGuard], // Protege esta rota
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
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
