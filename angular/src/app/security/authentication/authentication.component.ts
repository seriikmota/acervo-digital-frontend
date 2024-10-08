import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SecurityService} from "../service/security.service";
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";
import {User} from "../../model/user";
import {DialogMessageOkComponent} from "../../core/dialog-message-ok/dialog-message-ok.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit{
  formGroup!: FormGroup;
  public submitted!: boolean;
  private dialogRef!: MatDialogRef<any>;

  constructor(
    private securityService: SecurityService,
    private autenticationService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private dialogRefCurrent: MatDialogRef<any>) {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      login: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.autenticationService.login(this.formGroup.value).subscribe(data => {
        const user: User = {
          id: data.id,
          name: data.nome,
          login: data.login,
          password: data.password,
          expiresIn: data.expiresIn,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          roles: data.roles,
        };

        this.securityService.init(user);

        this.router.navigate(['items']);
      }, error => {
        console.log('erro', error);
        this.showMessage("Erro ao acessar: " + error.error);
      });
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
