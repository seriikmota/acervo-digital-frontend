import { Injectable } from '@angular/core';

import {Observable} from "rxjs";
import {AuthDto} from "../../model/auth";
import {CredencialDto} from "../../model/credencial-dto";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private authService: AuthService) {
  }

  public login(authDto: AuthDto): Observable<CredencialDto> {
    return this.authService.login(authDto);
  }

  public refresh(refreshToken: string): Observable<any> {
    return this.authService.refresh(refreshToken);
  }

}
