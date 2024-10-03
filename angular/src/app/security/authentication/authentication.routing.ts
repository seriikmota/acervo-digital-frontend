import {Routes} from "@angular/router";
import {AuthenticationComponent} from "./authentication.component";

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    redirectTo: "login",
    pathMatch: 'full',
  },
  {
    path:"login",
    component: AuthenticationComponent,
  }
];
