import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {CreatePostPayload, Post} from "../../model/post";
import {PostService} from "../post.service";

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
    if (input?.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  onSubmit(): void {
    if (this.addPostForm.valid) {
      const formValues = this.addPostForm.value;

      const postDTO: Post = {
        id: 0,
        title: formValues.title,
        subtitle: formValues.subtitle,
        content: formValues.content,
        approval: formValues.approval,
        publicationDate: formValues.publicationDate,
        tag: formValues.tag,
        files: []
      };

      const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };

      const filePromises = this.selectedFiles.map((file: File, index: number) =>
        convertFileToBase64(file).then(base64File => {
          postDTO.files.push({
            id: index,
            fileName: `file_${index + 1}.png`,
            file: base64File.split(',')[1]
          });
        })
      );

      Promise.all(filePromises).then(() => {
        const postData = {
          dto: postDTO,
          files: this.selectedFiles.map(file => file.name)
        };

        this.postService.createPost(postData).subscribe({
          next: (response: any) => {
            console.log('Post criado com sucesso:', response);
            this.dialogRef.close(response);
          },
          error: (error: any) => {
            console.error('Erro ao criar o post:', error);
          }
        });
      }).catch(error => {
        console.error('Erro ao converter arquivos:', error);
      });
    }
  }

}
