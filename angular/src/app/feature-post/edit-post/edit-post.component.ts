import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../post.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent {
  editPostForm: FormGroup;
  selectedFile: File | null = null;
  currentIndex: number = 0;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private dialogRef: MatDialogRef<EditPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editPostForm = this.fb.group({
      title: [this.data?.title || '', [Validators.required]],
      subtitle: [this.data?.subtitle || '', [Validators.required]],
      content: [this.data?.content || '', [Validators.required]],
      tag: [this.data?.tag || '', [Validators.required]]
    });
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
