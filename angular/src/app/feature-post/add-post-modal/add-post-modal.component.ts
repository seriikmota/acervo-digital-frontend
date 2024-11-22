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
  selectedFile: File | null = null;

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
      this.selectedFile = input.files[0];
      console.log('Arquivo selecionado:', this.selectedFile.name);
    }
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

      if (this.selectedFile) {
        formData.append('files', this.selectedFile);
      }

      this.postService.createPost(formData).subscribe({
        next: (response) => {
          this.notificationsService.success("Atualizado com sucesso!");
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Erro ao criar postagem:', error);
        },
      });
    }
  }

}
