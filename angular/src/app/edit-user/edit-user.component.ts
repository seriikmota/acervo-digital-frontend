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

  permissions: string[] = ['Admin', 'Assistant'];

  ngOnInit(): void {
    // Inicializando o form vazio
    this.usuarioForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      function: ['', Validators.required],
      login: ['', Validators.required],
      enabled: [this.data?.enabled || false, Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });

    // Se há um ID, fazer a consulta e atualizar o form com patchValue
    if (this.data?.id != null) {
      this.userService.consultarPorId(this.data.id).subscribe(response => {
        if (response) {
          this.usuarioForm.patchValue(response);

          // Desabilitar campos de senha se for edição
          this.usuarioForm.get('password')?.clearValidators();
          this.usuarioForm.get('password')?.updateValueAndValidity();
          this.usuarioForm.get('confirmPassword')?.clearValidators();
          this.usuarioForm.get('confirmPassword')?.updateValueAndValidity();
        }
      });
    }
  }

// Validador de senha
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.usuarioForm != null) {
      console.log(this.usuarioForm)

      if (!this.usuarioForm.get('password')?.value && this.usuarioForm.get('id')?.value) {
        this.usuarioForm.get('password')?.setValue(this.data.password);
        this.usuarioForm.get('confirmPassword')?.setValue(this.data.password);
      }

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
}
