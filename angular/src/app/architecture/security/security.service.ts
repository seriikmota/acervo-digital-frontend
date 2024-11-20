import {EventEmitter, Inject, Injectable} from '@angular/core';

import {IConfig, config} from './config';
import {Credential} from './credential';
import {User} from './User';
import {AuthService} from "../auth.service";


@Injectable()
export class SecurityService {
  public securityConfig: IConfig;

  private intervalId: any;

  private _credential: Credential;

  public onRefresh: EventEmitter<string>;

  public onForbidden: EventEmitter<Credential>;

  public onUnauthorized: EventEmitter<Credential>;

  public onUpdateUser: EventEmitter<User | undefined>;
  public onUpdateMenu: EventEmitter<undefined>;

  constructor(@Inject(config) config: IConfig, private authService: AuthService) {
    this.securityConfig = config;
    this._credential = new Credential(config);
    this.onRefresh = new EventEmitter<string>();
    this.onForbidden = new EventEmitter<Credential>();
    this.onUnauthorized = new EventEmitter<Credential>();
    this.onUpdateUser = new EventEmitter<User | undefined>();
    this.onUpdateMenu = new EventEmitter<undefined>();
  }

  public init(user?: User): void {
    console.log('security.service', user);
    this.credential.init(user);
    this.onUpdateMenu.emit();
    this.onUpdateUser.emit(this._credential.user);

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

  public logout(): void {
    this.authService.logout(this._credential.accessToken).subscribe({
      next: () => {
        this.invalidate();
        this.onUpdateUser.emit(undefined);
        this.onUpdateMenu.emit(undefined);
      }
    });
  }

  public invalidate(): void {
    this._credential.clean();
    clearInterval(this.intervalId);
    this.onUnauthorized.emit(this._credential);
  }

  public isValid(): boolean {
    return this._credential.user !== undefined;
  }

  public get credential(): Credential {
    return this._credential;
  }
}
