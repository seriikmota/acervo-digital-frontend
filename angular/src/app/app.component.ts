import {Component, computed, OnInit, signal} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {MessageService} from "./core/message.service";
import {SecurityService} from "./security/service/security.service";
import {AuthenticationService} from "./security/authentication/authentication.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogMessageOkComponent} from "./core/dialog-message-ok/dialog-message-ok.component";
import {User} from "./model/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular';
  private dialogRef!: MatDialogRef<any>;

  collapsed = signal(true);
  sidenavWidth = computed(() => this.collapsed() ? '0px' : '250px');
  showLayout = signal(true); // Novo sinal para controlar a exibição do layout completo

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private autenticationService: AuthenticationService,
    private securityService: SecurityService,
    private messageService: MessageService,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/acesso/login') {
          this.showLayout.set(false);
        } else {
          this.showLayout.set(true);
        }
      }
    });
  }

  ngOnInit(): void {
    this.securityService.onRefresh.subscribe((refreshToken: string) => {
      const accessToken = localStorage.getItem('accessToken');
      const storedRefreshToken = localStorage.getItem('refreshToken');

      if (accessToken && storedRefreshToken) {
        this.autenticationService.refresh(storedRefreshToken).subscribe(data => {
          const user: User = {
            accessToken: data.accessToken,
            expiresIn: data.expiresIn,
            id: data.id,
            login: data.login,
            name: data.nome,
            refreshToken: data.refreshToken,
            roles: data.roles
          };
          this.securityService.init(user);
          this.autenticationService.scheduleTokenRefresh(user.refreshToken, user.expiresIn);
        }, error => {
          if (error.error === "Token expirado!") {
            console.error(error);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            this.router.navigate(['/acesso/login']);
          } else {
            console.error(error);
            this.showMessage(error);
          }
        });
      } else {
        console.warn("Usuário não autenticado. Não é possível realizar refresh.");
        this.router.navigate(['/acesso/login']);
      }
    });

    this.securityService.onForbidden.subscribe(() => {
      this.showMessage("Sem Acesso");
      this.router.navigate(['/acesso']);
    });

    this.securityService.onUnauthorized.subscribe(() => {
      this.showMessage("Não autorizado!");
      this.router.navigate(['/']);
      this.securityService.invalidate();
    });

    this.securityService.init();


    this.messageService.getConfirmEmitter().subscribe((item: string) => this.addConfirmItem(item));
  }

  private addConfirmItem(item: string): void {
    this.dialog.open(DialogMessageOkComponent, {
      minWidth: '30%',
      minHeight: '30%',
      disableClose: true,
      data: {item}
    });
  }

  private showMessage(message: string) {
    this.dialogRef = this.dialog.open(DialogMessageOkComponent, {
      minWidth: "500px",
      minHeight: "100px",
      disableClose: true,
      data: message
    });
    this.dialogRef.afterClosed().subscribe(value => {
    });
  }
}
