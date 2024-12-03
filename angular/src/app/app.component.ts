import {Component, computed, OnInit, signal} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ArchitectureService} from "./architecture/architecture.service";
import {SecurityService} from "./architecture/security/security.service";
import {User} from "./architecture/security/User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular';
  showUser: boolean = false;
  nameUser: string = '';
  private dialogRef!: MatDialogRef<any>;

  collapsed = signal(true);
  sidenavWidth = computed(() => this.collapsed() ? '0px' : '250px');
  showLayout = signal(true); // Novo sinal para controlar a exibição do layout completo

  constructor(private architectureService: ArchitectureService,
              protected securityService: SecurityService) {
    this.updateInfoUser();
  }

  ngOnInit(): void {
    this.architectureService.init();
  }

  sair() {
    this.securityService.logout();
  }

  updateInfoUser() {
    this.securityService.onUpdateUser.subscribe((user: User) => {
      if (user) {
        this.nameUser = user.name;
        this.showUser = true;
      } else {
        this.nameUser = '';
        this.showUser = false;
      }
    });
  }
}
