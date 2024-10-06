import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AuthDto} from "../../model/auth";
import {HttpClient, HttpEvent} from "@angular/common/http";
import {AuthService} from "../service-auth/auth.service";
import {User} from "../../model/user";
import {SecurityService} from "../service/security.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient, private authApiService: AuthService,    private securityService: SecurityService,
  ) { }

  public login(usuarioTO: AuthDto): Observable<any> {
    return this.authApiService.login({ body: usuarioTO });
  }

  public refresh(refreshToken: string): Observable<any> {
    return this.authApiService.refresh({ refreshToken });
  }

  public scheduleTokenRefresh(refreshToken: string, tokenExpiration: number) {
    setTimeout(() => {
      this.refresh(refreshToken).subscribe(
        data => {
          const user: User = {
            accessToken: data.accessToken,
            expiresIn: data.expiresIn,
            id: data.id,
            login: data.login,
            name: data.nome,
            refreshToken: data.refreshToken,
            roles: data.roles
          };
          // Optionally re-initiate the security service
          this.securityService.init(user);
          // Reschedule the next refresh
          this.scheduleTokenRefresh(data.refreshToken, data.expiresIn);
        },
        error => {
          console.error("Token refresh error: ", error);
        }
      );
    }, (tokenExpiration - 60) * 1000);
  }
}
