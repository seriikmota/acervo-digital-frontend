import {Component, Inject} from '@angular/core';
import {AbstractListarComponent} from "../shared/abstract-listar/abstract-listar.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import * as tableGlobals from "../shared/abstract-listar/globals-table";
import {columnNamesMappingLog} from "../shared/abstract-listar/globals-table";
import {ListLogService} from "./service/list-log.service";

@Component({
  selector: 'app-listagem-log',
  templateUrl: '../shared/abstract-listar/abstract-listar.component.html',
  styleUrls: ['./list-log.component.scss']
})
export class ListLogComponent extends AbstractListarComponent {

  constructor(public override service: ListLogService,
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

}
