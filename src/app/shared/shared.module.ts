import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedAuthenticationModule } from './authentication/authentication.module';
import { FileSizePipe } from './file-size.pipe';
import { HttpModule } from '@angular/http';


@NgModule({
  exports: [
    CommonModule,
    SharedAuthenticationModule,
    FileSizePipe,
    HttpModule,
  ],
  imports: [
    SharedAuthenticationModule,
  ],
  providers: [
  ],
  declarations: [
    FileSizePipe,
  ],
})
export class SharedModule { }
