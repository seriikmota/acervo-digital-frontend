import {Component, Inject} from '@angular/core';
import {AbstractListarComponent, RoleConfig} from "../../shared/abstract-listar/abstract-listar.component";
import {postRoles} from "../post-routing.module";
import {ItemService} from "../../feature-item/item.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import * as tableGlobals from "../../shared/abstract-listar/globals-table";
import {PostService} from "../post.service";
import {columnNamesMappingItems} from "../../shared/abstract-listar/globals-table";
import {Post} from "../../model/post";
import {AddPostModalComponent} from "../add-post-modal/add-post-modal.component";

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
  posts: Post[] = [];
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

  override ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.service.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
      }
    });
  }

  openAddPostDialog(): void {
    const dialogRef = this.dialog.open(AddPostModalComponent, {
      width: '500px',
      data: {} // Você pode passar dados iniciais para o modal se necessário
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Lógica para adicionar o novo post (chamar serviço ou atualizar a lista local)
        console.log('Nova postagem criada:', result);
      }
    });
  }
}
