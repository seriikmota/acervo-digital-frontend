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
    this.service.listarLogs(this.filtroObjeto, this.pageNumber, this.pageSize, this.getSortData()).subscribe({
      next: (data: any) => {
        this.dataSource.data = data.content.map((item: any) => {
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
        this.paginator.pageIndex = data.pageable.pageNumber;
        this.paginator.pageSize = data.pageable.pageSize;
        this.paginator.length = data.totalElements;

        this.changeDetector.detectChanges();
      },
    });
  }

  getRoles(): RoleConfig {
    return {};
  }

}
