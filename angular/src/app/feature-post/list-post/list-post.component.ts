import {Component, Inject} from '@angular/core';
import {AbstractListarComponent, RoleConfig} from "../../shared/abstract-listar/abstract-listar.component";
import {postRoles} from "../post-routing.module";
import {ItemService} from "../../feature-item/item.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import * as tableGlobals from "../../shared/abstract-listar/globals-table";
import {PostService} from "../post.service";
import {columnNamesMappingItems} from "../../shared/abstract-listar/globals-table";

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrl: './list-post.component.scss'
})
export class ListPostComponent extends AbstractListarComponent {


  constructor(public override service: PostService,
              public override  dialog: MatDialog,
              public override  dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public override  data: any) {
    super(service, dialogRef, dialog, data);
  }

  protected override getColumnNamesMapping(): { [key: string]: string; } {
     return columnNamesMappingItems;
  }
  override getEditComponent() {
      return 'post'
  }
  override getnameComponent() {
      return 'post'
  }
  override getRoles(): RoleConfig {
    return {
      CREATE_ROLE: postRoles.CREATE,
      UPDATE_ROLE: postRoles.UPDATE,
      DELETE_ROLE: postRoles.DELETE,
      READ_ROLE: postRoles.READ,
    };
  }

  post = {
    title: 'A Journey into Angular Material',
    author: 'John Doe',
    date: new Date(),
    imageUrl: 'https://source.unsplash.com/800x400/?technology,code',
    content: `
      Angular Material simplifies the process of building clean, consistent, and responsive UIs.
      This blog post explores the various components and their applications in modern development.
    `
  };
}
