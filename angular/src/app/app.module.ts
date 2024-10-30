import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routes} from './app-routing.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {DialogMessageConfirmComponent} from './core/dialog-message-confirm/dialog-message-confirm.component';
import {DialogMessageOkComponent} from './core/dialog-message-ok/dialog-message-ok.component';
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ListUserComponent} from './list-user/list-user.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SidnavComponent} from './sidnav/sidnav.component';
import {MatListModule} from "@angular/material/list";
import {HTTP_INTERCEPTORS, provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {AbstractService} from "./shared/abstract.service";
import {MatCardModule} from "@angular/material/card";
import {EditUserComponent} from './edit-user/edit-user.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ListItemsComponent} from './list-items/list-items.component';
import {EditItemsComponent} from './edit-items/edit-items.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {SecurityGuard} from "./security/security.guard";
import {AuthenticationService} from "./security/authentication/authentication.service";
import {SecurityModule} from "./security/security.module";
import {AuthenticationModule} from "./security/authentication/authentication/authentication.module";
import {SecurityInterceptor} from "./security/security.interceptor";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { ListLogComponent } from './list-log/list-log.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogMessageConfirmComponent,
    DialogMessageOkComponent,
    ListUserComponent,
    SidnavComponent,
    EditUserComponent,
    ListItemsComponent,
    EditItemsComponent,
    ListLogComponent,
    AboutComponent,
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
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AuthenticationModule,
    SecurityModule,//TODO conferir a configuração
    SecurityModule.forRoot({
      nameStorage: 'portalSSOSecurityStorage',
      loginRouter: '/acesso/login'
    }),
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
  ],
  providers: [
    provideHttpClient(),
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    {provide: AbstractService, useValue: {}},
    { provide: SecurityGuard, useValue: {} },
    AuthenticationService,
    SecurityGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
