import {Injectable} from '@angular/core';
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

  static readonly LoginPath = 'http://localhost:8080/api/v1auth/login';


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

    return this.login$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CredencialDto>>) => r.body as Array<CredencialDto>)
    );
  }

  static readonly GetInfoByTokenValidacaoPath = 'http://localhost:8080/api/v1auth/senha/solicitacao/info';


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

                            requestToken?: string;
                            'Request-Token'?: string;
                          },
                          context?: HttpContext
  ): Observable<Array<boolean>> {

    return this.getInfoByTokenValidacao$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<boolean>>) => r.body as Array<boolean>)
    );
  }

  static readonly RefreshPath = 'http://localhost:8080/api/v1auth/refresh';

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

    return this.refresh$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CredencialDto>>) => r.body as Array<CredencialDto>)
    );
  }

  static readonly GetInfoByTokenPath = 'http://localhost:8080/api/v1auth/info';

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

                   Authorization: string;
                 },
                 context?: HttpContext
  ): Observable<Array<CredencialDto>> {

    return this.getInfoByToken$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CredencialDto>>) => r.body as Array<CredencialDto>)
    );
  }

}
