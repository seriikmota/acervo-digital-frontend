import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {AuthenticationComponent} from './authentication.component';
import {AuthenticationService} from "./authentication.service";
import {SharedMaterialModule} from "../shared-material/shared-material.module";
import {RouterModule} from "@angular/router";
import {authenticationRoute} from "./authentication-routing.module";
import {MessageModule} from "../message/message.module";


@NgModule({
  declarations: [
    AuthenticationComponent
  ],
    imports: [
        CommonModule,
        SharedMaterialModule,
        RouterModule.forChild(authenticationRoute),
        MessageModule,
    ],
  providers: [
    AuthenticationService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AuthenticationModule { }
