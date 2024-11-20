import {Component, Inject} from '@angular/core';
import {AbstractListarComponent, RoleConfig} from "../../shared/abstract-listar/abstract-listar.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import * as tableGlobals from "../../shared/abstract-listar/globals-table";
import {columnNamesMappingLog} from "../../shared/abstract-listar/globals-table";
import {UserService} from "../user.service";

@Component({
  selector: 'app-listagem-log',
  templateUrl: '../../shared/abstract-listar/abstract-listar.component.html',
  styleUrls: ['./list-log.component.scss']
})
export class ListLogComponent extends AbstractListarComponent {

  constructor(public override service: UserService,
              public override  dialog: MatDialog,
              public override  dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public override  data: any) {
    super(service, dialogRef, dialog, data);
    this.displayedColumns = tableGlobals.displayedColumnsLog;
  }

  override getEditComponent(): any {
    return null;
  }

  override getColumnNamesMapping() {
    return columnNamesMappingLog;
  }

  override getnameComponent(): any {
    return "log";
  }

  override listarDados(): void {
    this.service.listarLogs(this.filtroObjeto, this.pageNumber, this.pageSize).subscribe({
      next: (data) => {
        this.dataSource.data = data.map((item: any) => {
          for (const key in item) {
            if (Object.prototype.hasOwnProperty.call(item, key)) {
              const value = item[key];
              if (key.toLowerCase().includes('date') && this.isValidDate(value)) {
                item[key] = this.formatDate(value);
              }
            }
          }
          return item;
        });
      },
    });
  }

  getRoles(): RoleConfig {
    return {};
  }

}
