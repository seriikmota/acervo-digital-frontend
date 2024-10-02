import { Injectable } from '@angular/core';
import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {filter, map, Observable} from "rxjs";
import {CredencialDto} from "../../model/credencial-dto";
import {AuthDto} from "../../model/auth";
import {StrictHttpResponse} from "../../model/strict-http-response";
import {RequestBuilder} from "../../model/request-builder";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    protected http: HttpClient
  ) {
  }

  private _rootUrl: string = '';

  get rootUrl(): string {
    return this._rootUrl;
  }

  set rootUrl(rootUrl: string) {
    this._rootUrl = rootUrl;
  }
  static readonly RedefinirSenhaPath = '/api/v1/auth/senha';

  redefinirSenha$Response(params: {

                            requestToken?: string;


                            'Request-Token'?: string;
                            body: User
                          },
                          context?: HttpContext

  ): Observable<StrictHttpResponse<Array<CredencialDto>>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.RedefinirSenhaPath, 'put');
    if (params) {
      rb.query('requestToken', params.requestToken, {});
      rb.header('Request-Token', params['Request-Token'], {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CredencialDto>>;
      })
    );
  }

  redefinirSenha(params: {
                   requestToken?: string;

                   'Request-Token'?: string;
                   body: User
                 },
                 context?: HttpContext

  ): Observable<Array<CredencialDto>> {

    return this.redefinirSenha$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<CredencialDto>>) => r.body as Array<CredencialDto>)
    );
  }


  static readonly LoginPath = '/api/v1/auth/login';


  login$Response(params: {
                   body: AuthDto
                 },
                 context?: HttpContext

  ): Observable<StrictHttpResponse<Array<CredencialDto>>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.LoginPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CredencialDto>>;
      })
    );
  }

  login(params: {
          body: AuthDto
        },
        context?: HttpContext

  ): Observable<Array<CredencialDto>> {

    return this.login$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<CredencialDto>>) => r.body as Array<CredencialDto>)
    );
  }


  static readonly RecuperarSenhaPath = '/api/v1/auth/senha/solicitacao/{email}';


  recuperarSenha$Response(params: {

                            email: string;
                          },
                          context?: HttpContext

  ): Observable<StrictHttpResponse<Array<CredencialDto>>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.RecuperarSenhaPath, 'get');
    if (params) {
      rb.path('email', params.email, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CredencialDto>>;
      })
    );
  }


  recuperarSenha(params: {

                   email: string;
                 },
                 context?: HttpContext

  ): Observable<Array<CredencialDto>> {

    return this.recuperarSenha$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<CredencialDto>>) => r.body as Array<CredencialDto>)
    );
  }

  /**
   * Path part for operation getInfoByTokenValidacao
   */
  static readonly GetInfoByTokenValidacaoPath = '/api/v1/auth/senha/solicitacao/info';


  getInfoByTokenValidacao$Response(params?: {

                                     requestToken?: string;

                                     'Request-Token'?: string;
                                   },
                                   context?: HttpContext

  ): Observable<StrictHttpResponse<Array<boolean>>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.GetInfoByTokenValidacaoPath, 'get');
    if (params) {
      rb.query('requestToken', params.requestToken, {});
      rb.header('Request-Token', params['Request-Token'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<boolean>>;
      })
    );
  }

  getInfoByTokenValidacao(params?: {

                            /**
                             * Request Token
                             */
                            requestToken?: string;

                            /**
                             * Request Token
                             */
                            'Request-Token'?: string;
                          },
                          context?: HttpContext

  ): Observable<Array<boolean>> {

    return this.getInfoByTokenValidacao$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<boolean>>) => r.body as Array<boolean>)
    );
  }

  /**
   * Path part for operation refresh
   */
  static readonly RefreshPath = '/api/v1/auth/refresh';

  refresh$Response(params: {
                     refreshToken: string;
                   },
                   context?: HttpContext

  ): Observable<StrictHttpResponse<Array<CredencialDto>>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.RefreshPath, 'get');
    if (params) {
      rb.query('refreshToken', params.refreshToken, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CredencialDto>>;
      })
    );
  }

  refresh(params: {

            refreshToken: string;
          },
          context?: HttpContext

  ): Observable<Array<CredencialDto>> {

    return this.refresh$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<CredencialDto>>) => r.body as Array<CredencialDto>)
    );
  }

  static readonly GetInfoByTokenPath = '/api/v1/auth/info';

  getInfoByToken$Response(params: {

                            Authorization: string;
                          },
                          context?: HttpContext

  ): Observable<StrictHttpResponse<Array<CredencialDto>>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.GetInfoByTokenPath, 'get');
    if (params) {
      rb.header('Authorization', params.Authorization, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CredencialDto>>;
      })
    );
  }

  getInfoByToken(params: {

                   /**
                    * Token
                    */
                   Authorization: string;
                 },
                 context?: HttpContext

  ): Observable<Array<CredencialDto>> {

    return this.getInfoByToken$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<CredencialDto>>) => r.body as Array<CredencialDto>)
    );
  }

}
