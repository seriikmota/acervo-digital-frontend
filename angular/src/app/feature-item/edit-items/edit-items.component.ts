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


  onSubmit() {
    if (this.itemsForm!=null) {
      if (this.itemsForm.get('id')?.value) {
        this.itemsService.update(this.itemsForm.value, this.itemsForm.get('id')?.value).subscribe(
          response => {
            this.notificationsService.success("Item atualizado com sucesso!");
          }
        );
      } else {
        this.itemsService.save(this.itemsForm.value).subscribe(
          response => {
            this.notificationsService.success("Item salvo com sucesso!");
          }
        );
      }
    } else {
      this.notificationsService.warn("Formulário inválido. Por favor, preencha todos os campos obrigatórios.");
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Realize ações com o arquivo, como upload ou pré-visualização
    }
  }

}