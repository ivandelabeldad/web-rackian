import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatedGuard } from './authenticated.guard';
import { User } from './user';
import { AuthHttpService } from './auth-http.service';
import { Token } from './token';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    User,
    Token,
    AuthenticatedGuard,
    AuthHttpService,
  ]
})
export class SharedAuthenticationModule { }
