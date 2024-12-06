import {Component, inject, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DateAdapter} from '@angular/material/core';
import {SecurityService} from "../../architecture/security/security.service";
import {ItemService} from "../item.service";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'app-edit-items',
  templateUrl: './edit-items.component.html',
  styleUrls: ['./edit-items.component.scss'],
})
export class EditItemsComponent implements OnInit{
  itemsForm!: FormGroup;
  selectedFiles: File[] = [];


  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itemsService: ItemService,
    private dateAdapter: DateAdapter<Date>,
    private notificationsService: NotificationsService,
    private dialogRef: MatDialogRef<EditItemsComponent>,
  ) {
    this.dateAdapter.setLocale('en-GB');
  }
  protected securityService: SecurityService = inject(SecurityService);

  ngOnInit(): void {
    // Inicializando o formulário com valores padrão ou vazios
    this.itemsForm = this.formBuilder.group({
      id: [''],  // Inicializando vazio
      numberCode: ['', Validators.required],  // Campo obrigatório
      name: ['', Validators.required],
      description:  ['', Validators.required],
      heritageDate: ['', Validators.required],
      taxonomy: ['', Validators.required],
      period: ['', Validators.required],
      provenance: ['', Validators.required],
      colleactionYear: ['', Validators.required],
      collector: ['', Validators.required],
      collection: ['', Validators.required],
      location: ['', Validators.required],
      registerDate: ['', Validators.required],
      status: [''],  // Pode ser null por padrão
      approval: [''],  // Pode ser null por padrão
      images: [[   {
        id: '',
        image: ''
      }]],
      user: [this.securityService.credential.user?.id]  // Pode ser null por padrão
    });

    // Verifica se há um ID e faz a requisição
    if (this.data?.id != null) {
      this.itemsService.consultarPorId(this.data.id).subscribe(response => {
        if (response) {
          this.itemsForm.patchValue(response);
          this.data = response;
          console.log(this.data)
        }
      });
    }
    if (this.data.images!=null && this.data.images.length>0 ) {
      Promise.all(
        this.itemsForm.get('images')?.value.map((image: { image: string }, index: number) =>
          this.urlToFile(`data:image/jpg;base64,${image.image}`, `existing_image_${index + 1}.jpg`)
        )
      ).then((files) => {
        this.selectedFiles.push(...files);
        console.log('Imagens existentes convertidas para arquivos:', this.selectedFiles);
      });
    }


  }

  removeImage(index: number): void {
    if (this.selectedFiles != null && (this.selectedFiles.length > 3)) {
      this.selectedFiles.splice(index, 1);
      this.data.images.splice(index, 1);
    }else {
      this.data.images.splice(index, 1);
    }
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

  onSubmit() {
    if (this.itemsForm!=null) {
      const dto = {
        id: this.itemsForm.get('id')?.value,
        numberCode: this.itemsForm.get('numberCode')?.value,
        collector: this.itemsForm.get('collector')?.value,
        colleactionYear: this.itemsForm.get('colleactionYear')?.value,
        collection: this.itemsForm.get('collection')?.value,
        location: this.itemsForm.get('location')?.value,
        provenance: this.itemsForm.get('provenance')?.value,
        period: this.itemsForm.get('period')?.value,
        registerDate: this.itemsForm.get('registerDate')?.value,
        status: this.itemsForm.get('status')?.value,
        approval: this.itemsForm.get('approval')?.value,
        name: this.itemsForm.get('name')?.value,
        taxonomy: this.itemsForm.get('taxonomy')?.value,
        description: this.itemsForm.get('description')?.value,
        heritageDate: this.itemsForm.get('heritageDate')?.value,
        files:[]
      };

      const formData = new FormData();
      formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

      this.selectedFiles.forEach((file, index) => {
        formData.append(`files`, file); // Adiciona cada arquivo
      });

      if (this.itemsForm.get('id')?.value) {

        this.itemsService.update(formData,this.data.id).subscribe(
          response => {
            this.notificationsService.success("Item atualizado com sucesso!");
            this.dialogRef.close(true);
          }
        );
      } else {
        this.itemsService.save(formData).subscribe(
          response => {
            this.notificationsService.success("Item salvo com sucesso!");
            this.dialogRef.close(true);
          }
        );
      }
    } else {
      this.notificationsService.warn("Formulário inválido. Por favor, preencha todos os campos obrigatórios.");
    }
  }

  private async urlToFile(url: string, filename: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  }

}
