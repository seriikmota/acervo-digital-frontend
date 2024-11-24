import {Component, inject, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../post.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SecurityService} from "../../architecture/security/security.service";
import {postRoles} from "../post-routing.module";
import {DatePipe} from "@angular/common";
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
    private datePipe: DatePipe
  ) {
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
      approval: [this.data?.approval || false, Validators.required],
      publicationDate: [this.data?.publicationDate || new Date().toISOString(), Validators.required],
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

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.selectedFiles.push(files[i]); // Armazena arquivos selecionados
      }
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
        publicationDate: this.editPostForm.get('publicationDate')?.value, // Garantindo que seja uma string ISO válida
        tag: this.editPostForm.get('tag')?.value,
        images: this.data.images, // Inclui as imagens existentes
      };

      const formData = new FormData();
      formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

      // Adiciona novas imagens ao FormData
      this.selectedFiles.forEach((file) => {
        formData.append('files', file);
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
