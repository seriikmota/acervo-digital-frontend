import { EventEmitter, Injectable } from '@angular/core';
import { User } from "../../model/user";
import { Credential } from "../../model/credential";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private intervalId: any;

  private _credential: Credential;

  public onRefresh: EventEmitter<string>;

  public onForbidden: EventEmitter<Credential>;

  public onUnauthorized: EventEmitter<Credential>;

  constructor() {
    this._credential = new Credential();
    this.onRefresh = new EventEmitter<string>();
    this.onForbidden = new EventEmitter<Credential>();
    this.onUnauthorized = new EventEmitter<Credential>();
  }

  public init(user?: User): void {
    this.credential.init(user);

    if (user) {
      const expiresIn = (user.expiresIn - 60) * 1000;

      localStorage.setItem('userToken', user.accessToken);
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

  public getUserRoles(): string[] {
    return this._credential.user?.roles || [];
  }

  public hasRoles(roles: string | string[]): boolean {
    let valid = false;

    if (this.isValid()) {
      if (roles && roles.length > 0) {
        const userRoles = this.getUserRoles(); // Utilize o novo método para obter as roles

        if (userRoles) {
          if (typeof roles === 'string') {
            valid = userRoles.includes(roles);
          } else {
            for (let index = 0; index < roles.length; index++) {
              const role = roles[index];
              if (userRoles.includes(role)) {
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
  }

  public isValid(): boolean {
    return this._credential.user !== undefined;
  }

  public get credential(): Credential {
    return this._credential;
  }
}
