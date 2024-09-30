import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListUserComponent} from "./list-user/list-user.component";
import {ListItemsComponent} from "./list-items/list-items.component";

export const routes: Routes =  [{path:'',pathMatch:"full",redirectTo:'user'},
  {path:'user', component:ListUserComponent},
  {path:'items', component:ListItemsComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
