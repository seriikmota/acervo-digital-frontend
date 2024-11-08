
import { Injectable, EventEmitter, Inject } from '@angular/core';

import { config, IConfig } from './config';
import { Credential } from './credential';
import {User} from './User';


@Injectable()
export class SecurityService {
  public securityConfig: IConfig;

  private intervalId: any;

  private _credential: Credential;

  public onRefresh: EventEmitter<string>;

  public onForbidden: EventEmitter<Credential>;

  public onUnauthorized: EventEmitter<Credential>;


  constructor(@Inject(config) config: IConfig) {
    this.securityConfig = config;
    this._credential = new Credential(config);
    this.onRefresh = new EventEmitter<string>();
    this.onForbidden = new EventEmitter<Credential>();
    this.onUnauthorized = new EventEmitter<Credential>();
  }

  public init(user?: User): void {
    console.log('security.service', user);
    this.credential.init(user);

    if (user) {
      const expiresIn = (user.expiresIn - 60) * 1000;
      this.intervalId = setInterval(() => {
        clearInterval(this.intervalId);
        this.onRefresh.emit(this._credential.refreshToken);
      }, expiresIn);
    } else {
      if (this.isValid()) {
        this.onRefresh.emit(this._credential.refreshToken);
      }
    }
  }

  /**
   * Verifica se o Usuário possui o 'role' informado em sua credencial de acesso.
   *
   * @param roles
   */
  public hasRoles(roles: string | string[]): boolean {
    let valid = false;

    // Credencial deve ser 'true'.
    if (this.isValid()) {

      // Caso 'undefined' ou 'null' retorno será 'true'.
      if (roles && roles.length > 0) {
        const userRoles = this.credential.user?.roles;

        // Caso o usuário ativo não possua 'roles' o retorno será 'false'.
        if (userRoles) {

          // O atributo 'role' pode ser 'string' ou 'array'.
          if (typeof roles === 'string') {
            valid = userRoles.filter((userRole: string) => {
              return userRole === roles;
            }).length !== 0;
          } else {
            // tslint:disable-next-line:prefer-for-of
            for (let index = 0; index < roles.length; index++) {
              const role = roles[index];

              const count = userRoles.filter((userRole: string) => {
                return userRole === role;
              }).length;
              if (count > 0) {
                valid = true;
                break;
              }
            }
          }
        }
      } else {
        valid = true;
      }
    }
    return valid;
  }


  public invalidate(): void {
    this._credential.clean();
    clearInterval(this.intervalId);
    this.onUnauthorized.emit(this._credential);
  }

  public isValid(): boolean {
    const user = this._credential.user;

    // Verifica se há um usuário e se o token ainda é válido.
    if (user && user.expiresIn) {
      const currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos
      if (user.expiresIn > currentTime) {
        return true;
      }
    }

    // Token expirado ou usuário não autenticado, limpa cache
    this.invalidate();
    return false;
  }

  public get credential(): Credential {
    return this._credential;
  }
}
