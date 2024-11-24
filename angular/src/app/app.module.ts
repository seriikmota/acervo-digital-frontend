import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MessageModule} from "./architecture/message/message.module";
import {SecurityModule} from "./architecture/security/security.module";
import {SharedMaterialModule} from "./architecture/shared-material/shared-material.module";
import {ArchitectureModule} from "./architecture/architecture.module";
import {SidnavComponent} from "./sidnav/sidnav.component";
import {DialogMessageOkComponent} from "./core/dialog-message-ok/dialog-message-ok.component";
import {DialogMessageConfirmComponent} from "./core/dialog-message-confirm/dialog-message-confirm.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AboutComponent} from './about/about.component';
import {MatChipsModule} from "@angular/material/chips";
import {UserModule} from "./feature-user/user.module";
import {ItemModule} from "./feature-item/item.module";
import {SimpleNotificationsModule} from "angular2-notifications";
import {PostModule} from "./feature-post/post.module";


@NgModule({
  declarations: [
    AppComponent,
    DialogMessageConfirmComponent,
    DialogMessageOkComponent,
    SidnavComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ArchitectureModule,
    SharedMaterialModule,
    SecurityModule.forRoot({
      nameStorage: 'portalSSOSecurityStorage',
      loginRouter: '/auth/login'
    }),
    SimpleNotificationsModule.forRoot(),
    MessageModule,
    MatChipsModule,
    UserModule,
    ItemModule,
    PostModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
