import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogMessageOkComponent} from "../core/dialog-message-ok/dialog-message-ok.component";
import {EditItemsService} from "./service/edit-items.service";
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-edit-items',
  templateUrl: './edit-items.component.html',
  styleUrls: ['./edit-items.component.scss'],
})
export class EditItemsComponent implements OnInit{
  itemsForm!: FormGroup;
  private dialogRef!: MatDialogRef<any>;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itemsService: EditItemsService,
    private dialog: MatDialog,
    private dialogRefCurrent: MatDialogRef<any>,
    private dateAdapter: DateAdapter<Date>,
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

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
      user: [{id:1}]  // Pode ser null por padrão
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

            this.showMessage("Item atualizado com sucesso!");
          }
          ,
          error => {
            console.log(error.header)
            this.showMessage("Erro ao atualizar:\n" + error.error);
          }
        );
      } else {
        this.itemsService.save(this.itemsForm.value).subscribe(
          response => {
            this.showMessage("Item salvo com sucesso!");
          },
          error => {
            this.showMessage("Erro ao salvar:\n" + error.error);
          }
        );
      }
    } else {
      console.error("Formulário inválido. Por favor, preencha todos os campos obrigatórios.");
    }
  }

  private showMessage(message: string) {
    this.dialogRef = this.dialog.open(DialogMessageOkComponent, {
      minWidth: "500px",
      minHeight: "100px",
      disableClose: true,
      data: message
    });
    this.dialogRef.afterClosed().subscribe(value => {
      this.dialogRefCurrent.close();
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Realize ações com o arquivo, como upload ou pré-visualização
    }
  }


}
