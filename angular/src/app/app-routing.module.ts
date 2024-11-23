import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authenticationRoute} from "./architecture/authentication/authentication-routing.module";
import {AboutComponent} from "./about/about.component";
import {itemRoutes} from "./feature-item/item-routing.module";
import {userRoutes} from "./feature-user/user-routing.module";
import {postRoutes} from "./feature-post/post-routing.module";

export const routes: Routes = [
  {
    path: '',
    children: [
      ...itemRoutes,
      ...userRoutes,
      ...postRoutes
    ]
  },
  {
    path: "auth",
    children: [
      ...authenticationRoute
    ]
  },
  {
    path: 'about',
    component: AboutComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
