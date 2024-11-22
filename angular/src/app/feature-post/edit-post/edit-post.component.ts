import {Component, inject, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../post.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SecurityService} from "../../architecture/security/security.service";
import {postRoles} from "../post-routing.module";
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
  selectedFile: File | null = null;
  currentIndex: number = 0;
  permissionConfig: PermissionConfig;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private dialogRef: MatDialogRef<EditPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private securityService: SecurityService
  ) {
    // Inicializando as permissões
    this.permissionConfig = this.getPermissions();

    // Criando o formulário com as permissões
    this.editPostForm = this.fb.group({
      title: [{ value: this.data?.title || '', disabled: !this.permissionConfig.HAS_PERMISSION_UPDATE }, [Validators.required]],
      subtitle: [{ value: this.data?.subtitle || '', disabled: !this.permissionConfig.HAS_PERMISSION_UPDATE }, [Validators.required]],
      content: [{ value: this.data?.content || '', disabled: !this.permissionConfig.HAS_PERMISSION_UPDATE }, [Validators.required]],
      tag: [{ value: this.data?.tag || '', disabled: !this.permissionConfig.HAS_PERMISSION_UPDATE }, [Validators.required]],
    });
  }

  // Retorna a configuração de roles
  private getRoles(): RoleConfig {
    // Aqui você deve definir os roles de acordo com sua lógica ou carregar de algum serviço
    return {
      CREATE_ROLE: postRoles.CREATE,
      UPDATE_ROLE: postRoles.UPDATE ,
      DELETE_ROLE: postRoles.DELETE ,
      READ_ROLE:  postRoles.READ,
    };
  }

  // Retorna as permissões do usuário com base nos roles
  private getPermissions(): PermissionConfig {
    const roles = this.getRoles();  // Obtendo os roles definidos acima
    return {
      HAS_PERMISSION_CREATE: this.securityService.hasRoles(roles.CREATE_ROLE || ''),
      HAS_PERMISSION_UPDATE: this.securityService.hasRoles(roles.UPDATE_ROLE || ''),
      HAS_PERMISSION_DELETE: this.securityService.hasRoles(roles.DELETE_ROLE || ''),
      HAS_PERMISSION_READ: this.securityService.hasRoles(roles.READ_ROLE || ''),
    };
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.editPostForm.valid) {
      const dto = {
        id: this.data?.id || 0,
        title: this.editPostForm.get('title')?.value,
        subtitle: this.editPostForm.get('subtitle')?.value,
        content: this.editPostForm.get('content')?.value,
        approval: this.data?.approval || true,
        publicationDate: this.data?.publicationDate || new Date().toISOString(),
        tag: this.editPostForm.get('tag')?.value,
        images: []
      };

      const formData = new FormData();
      formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

      if (this.selectedFile) {
        formData.append('files', this.selectedFile);
      } else if (this.data?.images?.length > 0) {
        const existingFile = this.data.images[0];
        if (existingFile && existingFile.image) {
          const fileBlob = this.base64ToBlob(existingFile.image);
          formData.append('files', fileBlob, 'existing-image.png');
        }
      }

      this.postService.updatePost(formData,this.data.id).subscribe({
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

  base64ToBlob(base64String: string): Blob {
    const byteCharacters = atob(base64String);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: 'image/png' });
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex === 0) ? this.data?.images.length - 1 : this.currentIndex - 1;
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex === this.data?.images.length - 1) ? 0 : this.currentIndex + 1;
  }
}
