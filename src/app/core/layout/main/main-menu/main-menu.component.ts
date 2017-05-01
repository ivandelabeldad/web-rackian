import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/authentication/user';

@Component({
  selector: 'rackian-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainBarComponent implements OnInit {

  private user: User;

  constructor(private userService: User) { }

  ngOnInit() {
    this.user = this.userService;
  }

}
