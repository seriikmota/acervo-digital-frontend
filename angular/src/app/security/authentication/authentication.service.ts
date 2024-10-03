import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AuthDto} from "../../model/auth";
import {HttpClient, HttpEvent} from "@angular/common/http";
import {AuthService} from "../service-auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
              private authApiService: AuthService
  ) {
  }

  public login(usuarioTO: AuthDto): Observable<any> {
    return this.authApiService.login({body: usuarioTO});
  }

  refresh(refreshToken: string): Observable<any> {
    return this.authApiService.refresh({refreshToken});
  }

}
