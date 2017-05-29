import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from './user';


@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private router: Router, private user: User) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (route.routeConfig.path === 'login') {
      if (this.user.isLogged()) {
        this.router.navigate(['']);
        return false;
      } else {
        return true;
      }
    }
    if (!this.user.isLogged()) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
