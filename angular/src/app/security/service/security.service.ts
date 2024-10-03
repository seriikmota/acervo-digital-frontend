import {EventEmitter, Injectable} from '@angular/core';
import {User} from "../../model/user";
import {Credential} from "../../model/credential";

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

  public hasRoles(roles: string | string[]): boolean {
    let valid = false;

    if (this.isValid()) {

      if (roles && roles.length > 0) {
        const userRoles = this.credential.user?.roles;

        if (userRoles) {

          if (typeof roles === 'string') {
            valid = userRoles.filter((userRole: string) => {
              return userRole === roles;
            }).length !== 0;
          } else {
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
  }

  public isValid(): boolean {
    return this._credential.user !== undefined;
  }

  public get credential(): Credential {
    return this._credential;
  }
}
