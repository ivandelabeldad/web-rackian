import { Component, OnInit } from '@angular/core';
import { AuthenticatedUser } from '../../../shared/shared-authentication/AuthenticatedUser';

@Component({
  selector: 'rackian-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainBarComponent implements OnInit {

  constructor(private authenticatedUser: AuthenticatedUser) { }

  ngOnInit() {
  }

}
