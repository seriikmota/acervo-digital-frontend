import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {SecurityService} from "../service/security.service";
import {Observable} from "rxjs";

@Injectable()
export class authenticationGuard implements CanActivate {
  constructor(private router: Router, private securityService: SecurityService) { }


canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  let acesso = true;

  if (this.securityService.isValid()) {
    acesso = false;
    this.router.navigate(['/']);
  }
  return acesso;
}

}
