import {Component, computed, signal} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';


  collapsed=signal(true);

  sidenavWidth = computed(()=>this.collapsed() ? '80px':'250px')
}
