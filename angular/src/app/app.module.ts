import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app-routing.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { DialogMessageConfirmComponent } from './core/dialog-message-confirm/dialog-message-confirm.component';
import { DialogMessageOkComponent } from './core/dialog-message-ok/dialog-message-ok.component';
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { ListUserComponent } from './list-user/list-user.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import { SidnavComponent } from './sidnav/sidnav.component';
import {MatListModule} from "@angular/material/list";
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {AbstractService} from "./shared/abstract.service";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    AppComponent,
    DialogMessageConfirmComponent,
    DialogMessageOkComponent,
    ListUserComponent,
    SidnavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
  ],
  providers: [provideRouter(routes),
    provideHttpClient(), {provide: MatDialogRef,   useValue: {}}, {provide: MAT_DIALOG_DATA,   useValue: {}},{provide: AbstractService,   useValue: {}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
