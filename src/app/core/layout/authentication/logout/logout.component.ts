import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatedUser } from '../../../../shared/shared-authentication/AuthenticatedUser';

@Component({
  selector: 'rackian-logout',
  template: '',
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router, private authenticatedUser: AuthenticatedUser) {
    this.logout();
  }

  ngOnInit() {
  }

  private logout() {
    this.authenticatedUser.clear();
    this.router.navigate(['login']);
  }
}
