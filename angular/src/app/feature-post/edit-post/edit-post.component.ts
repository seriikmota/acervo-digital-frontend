import {Component, inject, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../post.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SecurityService} from "../../architecture/security/security.service";
import {postRoles} from "../post-routing.module";
import {DatePipe} from "@angular/common";
import {NotificationsService} from "angular2-notifications";
type PermissionConfig = {
  HAS_PERMISSION_CREATE?: boolean,
  HAS_PERMISSION_UPDATE?: boolean,
  HAS_PERMISSION_DELETE?: boolean,
  HAS_PERMISSION_READ?: boolean,
};
export type RoleConfig = {
  CREATE_ROLE?: string,
  UPDATE_ROLE?: string,
  DELETE_ROLE?: string,
  READ_ROLE?: string,
};
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent {
  editPostForm: FormGroup;
  selectedFiles: File[] = [];
  permissionConfig: PermissionConfig;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private dialogRef: MatDialogRef<EditPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private securityService: SecurityService,
    private notificationsService: NotificationsService,
  ) {
    console.log("Edit post ",data)
    // Inicializando as permissões
    this.permissionConfig = this.getPermissions();

    // Criando o formulário com as permissões
    this.editPostForm = this.fb.group({
      title: [
        { value: this.data?.title || '', disabled: !this.permissionConfig.HAS_PERMISSION_UPDATE },
        [Validators.required],
      ],
      subtitle: [
        { value: this.data?.subtitle || '', disabled: !this.permissionConfig.HAS_PERMISSION_UPDATE },
        [Validators.required],
      ],
      content: [
        { value: this.data?.content || '', disabled: !this.permissionConfig.HAS_PERMISSION_UPDATE },
        [Validators.required],
      ],
      tag: [
        { value: this.data?.tag || '', disabled: !this.permissionConfig.HAS_PERMISSION_UPDATE },
        [Validators.required],
      ],
      approval: [this.data?.approval === 'Ativo' ? true : false, Validators.required],
    });
  }

  // Retorna a configuração de roles
  private getRoles(): RoleConfig {
    return {
      CREATE_ROLE: postRoles.CREATE,
      UPDATE_ROLE: postRoles.UPDATE,
      DELETE_ROLE: postRoles.DELETE,
      READ_ROLE: postRoles.READ,
    };
  }

  // Retorna as permissões do usuário com base nos roles
  private getPermissions(): PermissionConfig {
    const roles = this.getRoles(); // Obtendo os roles definidos acima
    return {
      HAS_PERMISSION_CREATE: this.securityService.hasRoles(roles.CREATE_ROLE || ''),
      HAS_PERMISSION_UPDATE: this.securityService.hasRoles(roles.UPDATE_ROLE || ''),
      HAS_PERMISSION_DELETE: this.securityService.hasRoles(roles.DELETE_ROLE || ''),
      HAS_PERMISSION_READ: this.securityService.hasRoles(roles.READ_ROLE || ''),
    };
  }

  removeImage(index: number): void {
    this.data.images.splice(index, 1); // Remove a imagem do array de imagens existentes
  }
  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const filesArray = Array.from(input.files);
      if (this.selectedFiles.length + filesArray.length > 3) {
        this.notificationsService.error('Você pode enviar no máximo 3 imagens.');
        return;
      }

      this.selectedFiles.push(...filesArray);
      console.log('Arquivos selecionados:', this.selectedFiles.map(file => file.name));
    }
  }
  onSubmit(): void {
    if (this.editPostForm.valid) {
      const dto = {
        id: this.data?.id || 0,
        title: this.editPostForm.get('title')?.value,
        subtitle: this.editPostForm.get('subtitle')?.value,
        content: this.editPostForm.get('content')?.value,
        approval: this.editPostForm.get('approval')?.value,
        tag: this.editPostForm.get('tag')?.value,
        files: [], // Inclui as imagens existentes
      };


      const formData = new FormData();

      // Adicionar o DTO como JSON
      formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));


      // Adicionar novas imagens selecionadas
      this.selectedFiles.forEach((file, index) => {
        formData.append(`files`, file); // Adiciona cada arquivo
      });

      this.postService.updatePost(formData, this.data.id).subscribe({
        next: (response) => {
          console.log('Postagem editada com sucesso:', response);
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Erro ao editar postagem:', error);
        },
      });
    }
  }

}
