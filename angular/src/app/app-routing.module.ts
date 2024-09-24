import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListUserComponent} from "./list-user/list-user.component";

export const routes: Routes =  [{path:'',pathMatch:"full",redirectTo:'usuario'},
  {path:'usuario', component:ListUserComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
