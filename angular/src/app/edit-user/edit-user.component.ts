import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogMessageOkComponent} from "../core/dialog-message-ok/dialog-message-ok.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditUserService} from "./service/edit-user.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit{
  usuarioForm!: FormGroup;
  private dialogRef!: MatDialogRef<any>;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: EditUserService,
    private dialog: MatDialog,
    private dialogRefCurrent: MatDialogRef<any>
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      id: [this.data?.id || ''],
      name: [this.data?.name || '', Validators.required],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      password: ['', this.data? [] : Validators.required],
      confirmPassword: ['', this.data ? [] : Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.usuarioForm!=null) {
      if (this.usuarioForm.get('id')?.value) {
        this.userService.update(this.usuarioForm.value, this.usuarioForm.get('id')?.value).subscribe(
          response => {
            this.showMessage("Usuário atualizado com sucesso!");
          },
          error => {
            this.showMessage("Erro ao atualizar:\n" + error.error);
          }
        );
      } else {
        this.userService.save(this.usuarioForm.value).subscribe(
          response => {
            this.showMessage("Usuário salvo com sucesso!");
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

  setActiveStatus(isActive: boolean) {
    if (this.usuarioForm.get('id')?.value) {
      this.userService.setActiveStatus(this.usuarioForm.get('id')?.value, isActive).subscribe(
        response => {
          const status = isActive ? "ativado" : "desativado";
          this.showMessage(`Usuário ${status} com sucesso!`);
        },
        error => {
          const status = isActive ? "ativar" : "desativar";
          this.showMessage(`Erro ao ${status}:\n` + error.error);
        }
      );
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
}
