import {Component, inject, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
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
      heritageDate: ['', Validators.required],
      taxonomy: ['', Validators.required],
      period: ['', Validators.required],
      provenance: ['', Validators.required],
      colleactionYear: ['', Validators.required],
      collector: ['', Validators.required],
      collection: ['', Validators.required],
      location: ['', Validators.required],
      registerDate: ['', Validators.required],
      status: [null],  // Pode ser null por padrão
      approval: [null],  // Pode ser null por padrão
      files: [[]],
      user: [this.securityService.credential.user?.id]  // Pode ser null por padrão
    });

    // Verifica se há um ID e faz a requisição
    if (this.data?.id != null) {
      this.itemsService.consultarPorId(this.data.id).subscribe(response => {
        if (response) {
          // Preenchendo o formulário com os dados retornados
          this.itemsForm.patchValue(response);
        }
      });
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

        this.itemsService.update(this.itemsForm.value, this.itemsForm.get('id')?.value).subscribe(
          response => {
            this.notificationsService.success("Item atualizado com sucesso!");
          }
        );
      } else {
        this.itemsService.save(formData).subscribe(
          response => {
            this.notificationsService.success("Item salvo com sucesso!");
          }
        );
      }
    } else {
      this.notificationsService.warn("Formulário inválido. Por favor, preencha todos os campos obrigatórios.");
    }
  }

  // onFileSelected(event: Event): void {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (file) {
  //     // Realize ações com o arquivo, como upload ou pré-visualização
  //   }
  // }



}
