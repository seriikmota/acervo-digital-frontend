import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationComponent} from "../authentication.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {authenticationGuard} from "../authentication.guard";
import {AuthenticationService} from "../authentication.service";
import {AuthenticationRoutes} from "../authentication.routing";



@NgModule({
  declarations: [
    AuthenticationComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    RouterModule.forChild(AuthenticationRoutes),
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [
    authenticationGuard,
    AuthenticationService
  ]
})
export class AuthenticationModule { }
