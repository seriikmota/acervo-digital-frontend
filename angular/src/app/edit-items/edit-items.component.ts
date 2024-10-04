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
    this.itemsForm = this.formBuilder.group({
      id: [this.data?.id || ''],
      numberCode: [this.data?.number_code || ''],  // Atualizado para number_code
      name: [this.data?.name || '', Validators.required],
      heritageDate: [this.data?.heritage_date || '', Validators.required],  // Atualizado para heritage_date
      taxonomy: [this.data?.taxonomy || '', Validators.required],
      period: [this.data?.period || '', Validators.required],
      provenance: [this.data?.provenance || '', Validators.required],
      colleactionYear: [this.data?.colleaction_year || '', Validators.required],  // Atualizado para colleaction_year
      collector: [this.data?.collector || '', Validators.required],
      collection: [this.data?.collection || '', Validators.required],
      location: [this.data?.location || '', Validators.required],
      registerDate: [this.data?.register_date || '', Validators.required],  // Atualizado para register_date
      status: [this.data?.status || null],  // Adicionado campo status
      approval: [this.data?.approval || null],  // Adicionado campo approval
      user: [this.data?.user || null]  // Adicionado campo user
    });
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
            this.showMessage("Erro ao salvar:\n" + error.error());
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
