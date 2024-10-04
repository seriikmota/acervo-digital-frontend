// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import {AuthenticationRoutes} from "./security/authentication/authentication.routing";
// import {ListItemsComponent} from "./list-items/list-items.component";
// import {SecurityGuard} from "./security/security.guard";
// import {ListUserComponent} from "./list-user/list-user.component";
//
// export const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'acesso/login',
//     pathMatch: 'full'
//   },
//   {
//     path: 'items',
//     component: ListItemsComponent,
//     canActivate: [SecurityGuard],
//     data: { security: { roles: ['ROLE_USER'] } }
//   },
//   {
//     path: 'user',
//     component: ListUserComponent,
//     canActivate: [SecurityGuard],
//     data: { security: { roles: ['ROLE_ADMIN'] } }
//   },
//   {
//     path: 'acesso',
//     children: [
//       ...AuthenticationRoutes
//     ]
//   }
// ];
//
// @NgModule({
//   imports: [RouterModule.forRoot(routes, { useHash: true })],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListUserComponent} from "./list-user/list-user.component";
import {ListItemsComponent} from "./list-items/list-items.component";

export const routes: Routes =  [{path:'',pathMatch:"full",redirectTo:'items'},
  {path:'user', component:ListUserComponent},
  {path:'items', component:ListItemsComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
