import {Component, computed, inject, Input, signal} from '@angular/core';
import {USER_ASSISTENT_ROLE, USER_ROLES} from "../shared/roles";
import {SecurityService} from "../architecture/security/security.service";

@Component({
  selector: 'app-sidnav',
  templateUrl: './sidnav.component.html',
  styleUrls: ['./sidnav.component.scss']
})
export class SidnavComponent {
  protected securityService: SecurityService = inject(SecurityService);


  sidenavCollapsed = signal(false)
  @Input() set collapsed(value: boolean) {
    this.sidenavCollapsed.set(value)
  }
  redirectToWhatsapp() {
    window.open('https://wa.me/5562996885739?text=Quero%20agendar%20uma%20visita%20ao%20seu%20acervo', '_blank');
  }

  validaPermissoes(): boolean {
    return this.securityService.hasRoles(USER_ROLES);
  }


}
