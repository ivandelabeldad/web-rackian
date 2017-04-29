import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticatedUser } from './AuthenticatedUser';


@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private router: Router, private authenticatedUser: AuthenticatedUser) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authenticatedUser.exists()) {
      this.router.navigate(['/login']);
    }
    return this.authenticatedUser.exists();
  }
}
