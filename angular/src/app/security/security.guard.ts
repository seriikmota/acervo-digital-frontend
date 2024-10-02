import { CanActivateFn } from '@angular/router';

export const securityGuard: CanActivateFn = (route, state) => {
  return true;
};
