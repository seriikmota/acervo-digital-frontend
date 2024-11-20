import {Component, Inject} from '@angular/core';
import {AbstractListarComponent} from "../../shared/abstract-listar/abstract-listar.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import * as tableGlobals from "../../shared/abstract-listar/globals-table";
import {columnNamesMappingItems} from "../../shared/abstract-listar/globals-table";
import {ItemService} from "../item.service";
import {EditItemsComponent} from "../edit-items/edit-items.component";
import {ItemRoles} from "../item-routing.module";

@Component({
  selector: 'app-list-items',
  templateUrl: '../../shared/abstract-listar/abstract-listar.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent extends AbstractListarComponent{

  constructor(public override service: ItemService,
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

  override getShowActions(): boolean {
    return true;
  }

  override getShowExportPdf(): boolean {
    return true;
  }

  override getShowFilter(): boolean {
    return true;
  }

  override getRoles(): any {
    return {
      CREATE_ROLE: ItemRoles.CREATE,
      UPDATE_ROLE: ItemRoles.UPDATE,
      DELETE_ROLE: ItemRoles.DELETE,
      READ_ROLE: ItemRoles.READ,
    };
  }
}
