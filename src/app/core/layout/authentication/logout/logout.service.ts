import { Injectable } from '@angular/core';
import { User } from '../../../../shared/authentication/user';
import { Router } from '@angular/router';

@Injectable()
export class LogoutService {

  constructor(private router: Router, private user: User) { }

  public logout() {
    this.user.clear();
    this.router.navigate(['login']);
  }

}
