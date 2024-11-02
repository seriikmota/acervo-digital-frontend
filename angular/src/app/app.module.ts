import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MessageModule} from "./architecture/message/message.module";
import {SecurityModule} from "./architecture/security/security.module";
import {environment} from "./environments/environment";
import {SharedMaterialModule} from "./architecture/shared-material/shared-material.module";
import {ArchitectureModule} from "./architecture/architecture.module";
import {SidnavComponent} from "./sidnav/sidnav.component";
import {ListLogComponent} from "./list-log/list-log.component";
import {EditItemsComponent} from "./edit-items/edit-items.component";
import {ListItemsComponent} from "./list-items/list-items.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {ListUserComponent} from "./list-user/list-user.component";
import {DialogMessageOkComponent} from "./core/dialog-message-ok/dialog-message-ok.component";
import {DialogMessageConfirmComponent} from "./core/dialog-message-confirm/dialog-message-confirm.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ArchitectureModule,
    SharedMaterialModule,
    SecurityModule.forRoot({
      nameStorage: environment.nameStorage,
      loginRouter: '/auth/login'
    }),
    MessageModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
