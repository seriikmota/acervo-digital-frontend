import {User} from "./user";

export class Credential {

  private _user!: User |undefined;

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

  public get userName(): string | undefined {
    return this._user ? this._user.name : '';
  }

  public get login(): string | undefined {
    return this._user ? this._user.login : '';
  }

  public get accessToken(): string | undefined {
    return this._user ? this._user.accessToken : '';
  }

  public get refreshToken(): string | undefined {
    return this._user ? this._user.refreshToken : '';
  }

  private get securityStorage(): string {
    return 'StorageAppUEG';
  }
}
