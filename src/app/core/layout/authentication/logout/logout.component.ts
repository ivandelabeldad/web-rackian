import { Component, OnInit } from '@angular/core';
import { LogoutService } from './logout.service';

@Component({
  selector: 'rackian-logout',
  template: ' ',
})
export class LogoutComponent implements OnInit {

  constructor(private logoutService: LogoutService) {
    this.logoutService.logout();
  }

  ngOnInit() {
  }

}
