import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../../shared/authentication/user';
import { Token } from '../../../../shared/authentication/token';


@Injectable()
export class LogoutService {

  constructor(private router: Router, private user: User, private token: Token) { }

  public logout() {
    this.user.clear();
    this.token.clear();
    this.router.navigate(['login']);
  }

}
