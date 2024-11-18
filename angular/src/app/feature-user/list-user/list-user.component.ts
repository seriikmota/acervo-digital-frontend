import {Component, Inject} from '@angular/core';
import {AbstractListarComponent, RoleConfig} from "../../shared/abstract-listar/abstract-listar.component";
import {UserService} from "../user.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import * as tableGlobals from "../../shared/abstract-listar/globals-table";
import {columnNamesMappingUser} from "../../shared/abstract-listar/globals-table";
import {EditUserComponent} from "../edit-user/edit-user.component";
import {UserRoles} from "../user-routing.module";

@Component({
  selector: 'app-listagem-de-usuario',
  templateUrl: '../../shared/abstract-listar/abstract-listar.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent extends AbstractListarComponent {

  constructor(public override service: UserService,
              public override  dialog: MatDialog,
              public override  dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public override  data: any) {
    super(service, dialogRef, dialog, data);
    this.displayedColumns = tableGlobals.displayedColumnsUser;
  }

  override getEditComponent(): any {
    return EditUserComponent;
  }

  override getColumnNamesMapping() {
    return columnNamesMappingUser;
  }

  override getnameComponent(): any {
    return "user";
  }

  override getShowActions(): boolean {
    return true;
  }

  getRoles(): RoleConfig {
    return {
      CREATE_ROLE: UserRoles.CREATE,
      UPDATE_ROLE: UserRoles.UPDATE,
      DELETE_ROLE: UserRoles.DELETE,
      READ_ROLE: UserRoles.READ,
    };
  }

}
