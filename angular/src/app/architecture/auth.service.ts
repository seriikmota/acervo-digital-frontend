import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthDto} from "../model/auth";
import {CredencialDto} from "../model/credencial-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _rootUrl: string = '';

  static readonly LoginPath = 'http://localhost:8080/api/v1/auth/login';
  static readonly RefreshPath = 'http://localhost:8080/api/v1/auth/refresh';
  static readonly LogoutPath = 'http://localhost:8080/api/v1/auth/logout';

  constructor(protected http: HttpClient) {
  }

  get rootUrl(): string {
    return this._rootUrl;
  }
  set rootUrl(rootUrl: string) {
    this._rootUrl = rootUrl;
  }

  login(authDto: AuthDto): Observable<CredencialDto> {
    return this.http.post<CredencialDto>(AuthService.LoginPath, authDto).pipe(catchError(this.handleError))
  }

  refresh(refreshToken: string): Observable<CredencialDto> {
    let params = new HttpParams()
      .set('refreshToken', refreshToken);

    return this.http.get<CredencialDto>(AuthService.RefreshPath, {
        params: params
      }).pipe(catchError(this.handleError));
  }

  logout(token: string): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<any>(AuthService.LogoutPath,{
      headers: headers,
    }).pipe(catchError(this.handleError));
  }

  protected handleError(error: any): Observable<never> {
    return throwError(() => new Error(error.error));
  }
}
