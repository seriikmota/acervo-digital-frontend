import {Component, Inject} from '@angular/core';
import {AbstractListarComponent, RoleConfig} from "../../shared/abstract-listar/abstract-listar.component";
import {EditPostComponent} from "../edit-post/edit-post.component";
import {ItemRoles} from "../../feature-item/item-routing.module";
import {ItemService} from "../../feature-item/item.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PostService} from "../post.service";
import * as tableGlobals from "../../shared/abstract-listar/globals-table";
import {columnNamesMappingDTO, columnNamesMappingItems} from "../../shared/abstract-listar/globals-table";
import {AddPostModalComponent} from "../add-post-modal/add-post-modal.component";

@Component({
  selector: 'app-table-post',
  templateUrl: '../../shared/abstract-listar/abstract-listar.component.html',
  styleUrl: './table-post.component.scss'
})
export class TablePostComponent extends AbstractListarComponent {

  constructor(public override service: PostService,
              public override dialog: MatDialog,
              public override dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public override data: any) {
    super(service, dialogRef, dialog, data);
    this.displayedColumns = tableGlobals.displayedColumnsDTO;
  }


  protected override getColumnNamesMapping(): { [key: string]: string; } {
    return columnNamesMappingDTO;
  }

  override getEditComponent() {
    EditPostComponent;
  }

  override getnameComponent() {
    return 'post'
  }

  override getRoles(): RoleConfig {
    return {
      CREATE_ROLE: ItemRoles.CREATE,
      UPDATE_ROLE: ItemRoles.UPDATE,
      DELETE_ROLE: ItemRoles.DELETE,
      READ_ROLE: ItemRoles.READ,
    };
  }
  override getShowActions(): boolean {
    return true;
  }

  override incluir(): void {
    const dialogRef = this.dialog.open(AddPostModalComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarDados()
      }
    });
  }

 override editar(element: any): void {
    const dialogRef = this.dialog.open(EditPostComponent, {
      width: '800px',
      height: 'auto',
      maxHeight: '90vh',
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.listarDados()
    });
  }

}
