import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {SharedMaterialModule} from "../architecture/shared-material/shared-material.module";
import {ListUserComponent} from "./list-user/list-user.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {ListLogComponent} from "./list-log/list-log.component";


@NgModule({
  declarations: [
    ListUserComponent,
    EditUserComponent,
    ListLogComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedMaterialModule,
  ]
})
export class UserModule { }
