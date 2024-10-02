import {Component, computed, signal} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';

  collapsed = signal(true);
  sidenavWidth = computed(() => this.collapsed() ? '0px' : '250px');
  showLayout = signal(true); // Novo sinal para controlar a exibição do layout completo

  constructor(private router: Router) {
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


}
