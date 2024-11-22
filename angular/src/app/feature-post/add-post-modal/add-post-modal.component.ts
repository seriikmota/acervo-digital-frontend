import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {PostService} from "../post.service";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'app-add-post-modal',
  templateUrl: './add-post-modal.component.html',
  styleUrl: './add-post-modal.component.scss'
})
export class AddPostModalComponent {
  addPostForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private notificationsService: NotificationsService,
    private postService: PostService,
    private dialogRef: MatDialogRef<AddPostModalComponent>
  ) {
    this.addPostForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      content: ['', Validators.required],
      approval: [true],
      publicationDate: [new Date().toISOString()],
      tag: [''],
      files: [[]]
    });
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

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  onSubmit(): void {
    if (this.addPostForm.valid) {
      const dto = {
        title: this.addPostForm.get('title')?.value,
        subtitle: this.addPostForm.get('subtitle')?.value,
        content: this.addPostForm.get('content')?.value,
        approval: true,
        publicationDate: new Date().toISOString(),
        tag: this.addPostForm.get('tag')?.value,
        files: []
      };

      const formData = new FormData();
      formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

      this.selectedFiles.forEach((file, index) => {
        formData.append(`files`, file); // Adiciona cada arquivo
      });

      this.postService.createPost(formData).subscribe({
        next: (response) => {
          this.notificationsService.success('Postagem criada com sucesso!');
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Erro ao criar postagem:', error);
        }
      });
    }
  }
}
