import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rackian-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loading = false;

  constructor() { }

  ngOnInit() {
  }

  login() {
    this.loading = !this.loading;
  }

}
