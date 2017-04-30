import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'rackian-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loading = false;
  private username = '';
  private password = '';
  private remember = false;
  private error = false;

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
          this.router.navigate(['storage']);
        },
        err => {
          this.loading = false;
          this.username = '';
          this.password = '';
          this.error = true;
        }
      );
  }
}
