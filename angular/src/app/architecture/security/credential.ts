/* tslint:disable:variable-name no-redundant-jsdoc */
import { IConfig } from './config';
import {User} from './User';

export class Credential {

  private _user!: User |undefined;

  constructor(private config: IConfig) {
    console.log("Credition.constructor", config);
  }

  public init(user?: User): void {
    this._user = user!;

    if (this._user) {
      const data = JSON.stringify(this._user);
      localStorage.setItem(this.securityStorage, btoa(data));
    } else {
      let data = localStorage.getItem(this.securityStorage);

      if (data) {
        data = atob(data);
        this._user = JSON.parse(data);
      }
    }
  }

  public clean(): void {
    this._user = undefined;
    localStorage.removeItem(this.securityStorage);
  }

  public get user(): User | undefined {
    return this._user;
  }

  public get userName(): string {
    return this._user ? this._user.name : '';
  }

  public get login(): string {
    return this._user ? this._user.login : '';
  }

  public get accessToken(): string {
    return this._user ? this._user.accessToken : '';
  }

  /**
   * @returns refreshToken
   */
  public get refreshToken(): string {
    return this._user ? this._user.refreshToken : '';
  }

  private get securityStorage(): string {
    return `${this.config.nameStorage.trim()}`;
    //return 'StorageAppUEG';
  }
}
