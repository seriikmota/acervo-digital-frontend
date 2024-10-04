import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Inject, Injectable} from "@angular/core";
import {SecurityService} from "./service/security.service";
import {config,IConfig} from "../model/config";
import {Observable} from "rxjs";

@Injectable()
export class SecurityGuard implements CanActivate {


  constructor(
    private router: Router,
    private securityService: SecurityService,
    @Inject(config) private config: IConfig) { }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let valid = false;

    if (this.securityService.isValid()) {
      const roles = next.data['security'] ? next.data['security'].roles : [];
      if (this.securityService.hasRoles(roles)) {
        valid = true;
      } else {
        this.securityService.onForbidden.emit(this.securityService.credential);
        this.router.navigate(['/acesso/login']);
      }
    } else {
      this.router.navigate(['/acesso/login']);
    }

    return valid;
  }

}
