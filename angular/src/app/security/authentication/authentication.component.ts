import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SecurityService} from "../service/security.service";
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";
import {User} from "../../model/user";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit{
  formGroup!: FormGroup;
  public submitted!: boolean;

  constructor(
    private securityService: SecurityService,
    private autenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,) {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      login: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      senha: [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      this.autenticationService.login(this.formGroup.value).subscribe(data => {
        const user: User = {
          id: data.id,
          name: data.nome,
          login: data.login,
          expiresIn: data.expiresIn,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          roles: data.roles,
          email: '',
        };

        this.securityService.init(user);
        this.router.navigate(['/']);
      }, error => {
        console.log('erro', error);
        alert(error);
        // }
      });
    }
  }

}
