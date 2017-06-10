import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { conf } from '../../../../conf';

@Component({
  selector: 'rackian-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;
  username = '';
  password = '';
  remember = false;
  error = false;
  registerUrl = conf.url.register.base;

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.error = false;
    this.loading = !this.loading;
    this.loginService.login(this.username, this.password, this.remember)
      .subscribe(
        user => {
          this.loading = false;
          this.router.navigate(['']);
        },
        err => {
          this.loading = false;
          this.password = '';
          this.error = true;
        }
      );
  }

  toggleRemember() {
    this.remember = !this.remember;
  }
}
