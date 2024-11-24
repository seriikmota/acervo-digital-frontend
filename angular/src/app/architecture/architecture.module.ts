import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {ArchitectureService} from "./architecture.service";
import {MessageService} from "./message/message.service";
import {MessageModule} from "./message/message.module";
import {LoaderModule} from "./loader/loader.module";
import {A} from "@angular/cdk/keycodes";
import {AuthenticationService} from "./authentication/authentication.service";
import {AuthenticationModule} from "./authentication/authentication.module";
import {SecurityInterceptor} from "./security/security.interceptor";
import {HttpErrorInterceptor} from "./http-error.interceptor";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MessageModule,
    LoaderModule,
    AuthenticationModule
  ],
  providers: [
    ArchitectureService,
    MessageService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    {provide: DatePipe,useValue:{}},
    provideHttpClient(withInterceptorsFromDi()),
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    {provide: HTTP_INTERCEPTORS,              useClass: HttpErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS,              useClass: SecurityInterceptor, multi: true},
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ArchitectureModule { }
