import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderDialogComponent } from './loader-dialog/loader-dialog.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {LoaderService} from "./loader.service";
import {LoaderInterceptor} from "./loader.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";



@NgModule({
  declarations: [
    LoaderDialogComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true  }
  ]
})
export class LoaderModule { }
