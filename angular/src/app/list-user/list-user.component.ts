import {Component, Inject} from '@angular/core';
import {AbstractListarComponent} from "../shared/abstract-listar/abstract-listar.component";
import {ListUserService} from "./service/list-user.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import * as tableGlobals from "../shared/abstract-listar/globals-table";

@Component({
  selector: 'app-listagem-de-usuario',
  templateUrl: '../shared/abstract-listar/abstract-listar.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent extends AbstractListarComponent {

  constructor(public override service: ListUserService,
              public override  dialog: MatDialog,
              public override  dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public override  data: any) {
    super(service, dialogRef, dialog, data);
    this.displayedColumns = tableGlobals.displayedColumnsUser;
  }



}
