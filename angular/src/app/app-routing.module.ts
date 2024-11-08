import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListUserComponent} from "./list-user/list-user.component";
import {ListItemsComponent} from "./list-items/list-items.component";
import {ListLogComponent} from "./list-log/list-log.component";
import {SecurityGuard} from "./architecture/security/security.guard";
import {authenticationRoute} from "./architecture/authentication/authentication-routing.module";
import {AboutComponent} from "./about/about.component";
import * as roles from "../../src/app/shared/roles";

export const routes: Routes = [
  {
    path: '', // Rota vazia redireciona para 'items'
    redirectTo: 'items',
    pathMatch: 'full',
  },
  {
    path: 'items',
    component: ListItemsComponent, // Componente para 'items'
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
        path: 'user',
        component: ListUserComponent,
        canActivate: [SecurityGuard], // Protege esta rota
        data: {
          security: {
            roles: roles.USER_ROLES
          }
        }
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'log',
        component: ListLogComponent,
        canActivate: [SecurityGuard], // Protege esta rota
        data: {
          security: {
            roles: roles.USER_ROLES
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
