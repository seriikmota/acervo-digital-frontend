import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MessageDialog, MessageItem, MessageService} from "./message/message.service";
import {ConfirmDialogComponent} from "./message/confirm-mesage/confirm-dialog.component";
import {LoaderService} from "./loader/loader.service";
import {LoaderDialogComponent} from "./loader/loader-dialog/loader-dialog.component";
import {SecurityService} from "./security/security.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication/authentication.service";
import {User} from "./security/User";
import {IConfig} from "./security/config";
//import {GenericDialogComponent} from "./message/generic-dialog/generic-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class ArchitectureService {

  private dialogLoaderRef!: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private securityService: SecurityService,
    private authenticationService: AuthenticationService,
    ) { }

  init(): void {
    this.initLoaderIntercept();
    this.securityService.init();
    this.messageService.getConfirmEmitter().subscribe((item: MessageItem) => this.addConfirmItem(item));
    this.messageService.getDialogEmitter().subscribe((item: MessageDialog) => this.addDialogItem(item));

    this.configureSecurityActions();

  }

  private addConfirmItem(item: MessageItem): void {
    this.dialog.open(ConfirmDialogComponent, {
      minWidth: '30%',
      minHeight: '30%',
      disableClose: true,
      data: {item}
    });
  }

  private addDialogItem(item: MessageDialog): void {
    /*this.dialog.open(GenericDialogComponent, {
      minWidth: item.width,
      minHeight: item.height,
      disableClose: true,
      data: {item}
    });*/
  }

  private initLoaderIntercept(){
    this.loaderService.onStart.subscribe(() => {
      this.dialogLoaderRef = this.dialog.open(LoaderDialogComponent, {
        minWidth: '50px',
        minHeight: '50px',
        hasBackdrop: true,
        disableClose: true
      });
    });

    this.loaderService.onStop.subscribe(() => {
      if (this.dialogLoaderRef !== undefined) {
        this.dialogLoaderRef.close();
      }
    });
  }

  /**
   * Configura as ações de refresh (do token),de Forbiden, Unauthorized
   *
   * @private
   */
  private configureSecurityActions() {
    this.securityService.onRefresh.subscribe((refreshToken: string) => {
      this.authenticationService.refresh(refreshToken)
        .subscribe(
          {
            next: data => {
              const user: User = {
                id: data.id || 0,
                name: data.name || '',
                login: data.login || '',
                expiresIn: data.expiresIn || 3600,
                accessToken: data.accessToken || '',
                refreshToken: data.refreshToken || '',
                roles: data.roles
              };
              this.securityService.init(user);
            },
            error: error => {
              console.log(error);
              this.messageService.addMsgInf(error);
            }
          });
    });

    this.securityService.onForbidden.subscribe(() => {
      this.messageService.addMsgWarning("Sem acesso");
      this.router.navigate([this.securityService.securityConfig.loginRouter]);
    });

    this.securityService.onUnauthorized.subscribe(() => {
      this.messageService.addMsgWarning("Não autorizado!");
      // this.router.navigate(['/']);
    });
  }
}
