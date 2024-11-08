/* tslint:disable:no-redundant-jsdoc callable-types no-shadowed-variable */
/* tslint:disable:variable-name */
import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { SecurityService } from './security.service';
import { config, IConfig } from './config';

@Injectable()
export class SecurityGuard implements CanActivate {


    constructor(
      private router: Router,
      private securityService: SecurityService,
      @Inject(config) private config: IConfig) { }


    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let valid = false;
        console.log('canActive');
        if (this.securityService.isValid()) {
            const roles = next.data['security'] ? next.data['security'].roles : [];
          console.log("Credencial01 ",this.securityService.credential);

            if (this.securityService.hasRoles(roles)) {
                valid = true;
            } else {
              this.securityService.onUnauthorized.emit(this.securityService.credential);
            }
        } else {
          this.securityService.onForbidden.emit(this.securityService.credential);
        }
        return valid;
    }

}
