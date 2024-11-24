import {Component, inject, Input, signal} from '@angular/core';
import {SecurityService} from "../architecture/security/security.service";
import {ItemPaths} from "../feature-item/item-routing.module";
import {UserPaths, UserRoles} from "../feature-user/user-routing.module";
import {postPaths, postRoles, postTablePaths} from "../feature-post/post-routing.module";

@Component({
  selector: 'app-sidnav',
  templateUrl: './sidnav.component.html',
  styleUrls: ['./sidnav.component.scss']
})
export class SidnavComponent {
  protected securityService: SecurityService = inject(SecurityService);
  protected readonly UserPaths = UserPaths;
  protected readonly ItemPaths = ItemPaths;
  protected readonly postPaths = postPaths;
  protected readonly postTablePaths = postTablePaths;
  showUser: boolean = false;
  showUserLog: boolean = false;
  showPostTable:boolean= false;

  sidenavCollapsed = signal(false)
  @Input() set collapsed(value: boolean) {
    this.sidenavCollapsed.set(value)
  }

  constructor() {
    this.updateItemsMenu();
  }

  redirectToWhatsapp() {
    window.open('https://wa.me/5562996885739?text=Quero%20agendar%20uma%20visita%20ao%20seu%20acervo', '_blank');
  }

  updateItemsMenu() {
    this.securityService.onUpdateMenu.subscribe(() => {
      this.showUser = this.securityService.hasRoles(UserRoles.LIST_ALL);
      this.showUserLog = this.securityService.hasRoles(UserRoles.LIST_LOG);
      this.showPostTable = this.securityService.hasRoles(postRoles.LIST_TABLE_ALL);

      const menuState = {
        showUser: this.showUser,
        showUserLog: this.showUserLog,
        showPostTable:this.showPostTable,
        sidenavCollapsed: this.sidenavCollapsed()
      };
      localStorage.setItem('menuState', JSON.stringify(menuState));
    });

    const savedState = localStorage.getItem('menuState');
    if (savedState) {
      const state = JSON.parse(savedState);
      console.log(localStorage)
      this.showUser = state.showUser;
      this.showUserLog = state.showUserLog;
      this.showPostTable =state.showPostTable;
      this.sidenavCollapsed.set(state.sidenavCollapsed);
    }
  }



}
