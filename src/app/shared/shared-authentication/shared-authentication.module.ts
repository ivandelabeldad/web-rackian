import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatedGuard } from './AuthenticatedGuard';
import { AuthenticatedUser } from './AuthenticatedUser';
import { User } from './User';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthenticatedUser,
    AuthenticatedGuard,
    User,
  ]
})
export class SharedAuthenticationModule { }
