import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserService} from "../user.service";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit{
  usuarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private notificationsService: NotificationsService,
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
            this.notificationsService.success("Usuário atualizado com sucesso!");
          }
        );
      } else {
        this.userService.save(this.usuarioForm.value).subscribe(
          response => {
            this.notificationsService.success("Usuário salvo com sucesso!");
          }
        );
      }
    } else {
      this.notificationsService.warn("Formulário inválido. Por favor, preencha todos os campos obrigatórios.");
    }
  }
}
