import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatedUser } from './AuthenticatedUser';
import { AuthenticatedGuard } from './AuthenticatedGuard';


@NgModule({
  exports: [
    CommonModule,
  ],
  providers: [
    AuthenticatedUser,
    AuthenticatedGuard,
  ]
})
export class SharedModule { }
