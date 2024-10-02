import {Component, computed, Input, signal} from '@angular/core';

@Component({
  selector: 'app-sidnav',
  templateUrl: './sidnav.component.html',
  styleUrls: ['./sidnav.component.scss']
})
export class SidnavComponent {
  sidenavCollapsed = signal(false)
  @Input() set collapsed(value: boolean) {
    this.sidenavCollapsed.set(value)
  }
  redirectToWhatsapp() {
    window.open('https://wa.me/5562996885739?text=Quero%20agendar%20uma%20visita%20ao%20seu%20acervo', '_blank');
  }

}
