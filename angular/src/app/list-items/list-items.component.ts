import {Component, Inject} from '@angular/core';
import {AbstractListarComponent} from "../shared/abstract-listar/abstract-listar.component";
import {ListUserService} from "../list-user/service/list-user.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import * as tableGlobals from "../shared/abstract-listar/globals-table";
import {ListItemsService} from "./service/list-items.service";
import {EditItemsComponent} from "../edit-items/edit-items.component";
import {columnNamesMappingItems, displayedColumnsItems} from "../shared/abstract-listar/globals-table";

@Component({
  selector: 'app-list-items',
  templateUrl: '../shared/abstract-listar/abstract-listar.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent extends AbstractListarComponent{

  constructor(public override service: ListItemsService,
              public override  dialog: MatDialog,
              public override  dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public override  data: any) {
    super(service, dialogRef, dialog, data);
    this.displayedColumns = tableGlobals.displayedColumnsItems;
  }

    protected override getColumnNamesMapping(): { [key: string]: string; } {
      return columnNamesMappingItems;
    }
    override getEditComponent() {
        return EditItemsComponent;
    }

  override getnameComponent(): any {
    return "items"
  }

}
