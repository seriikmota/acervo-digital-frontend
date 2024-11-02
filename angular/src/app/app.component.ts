import {Component, computed, OnInit, signal} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ArchitectureService} from "./architecture/architecture.service";

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

  constructor(private architectureService: ArchitectureService) {
  }

  ngOnInit(): void {
    this.architectureService.init();
  }
}
