import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedAuthenticationModule } from './authentication/authentication.module';


@NgModule({
  exports: [
    CommonModule,
    SharedAuthenticationModule,
  ],
  imports: [
    SharedAuthenticationModule,
  ],
  providers: [
  ],
})
export class SharedModule { }
