import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { SharedAuthenticationModule } from './authentication/authentication.module';
import { FileIconPipe } from './file-icon.pipe';
import { FileSizePipe } from './file-size.pipe';


@NgModule({
  exports: [
    CommonModule,
    SharedAuthenticationModule,
    FileSizePipe,
    FileIconPipe,
    HttpModule,
  ],
  imports: [
    SharedAuthenticationModule,
  ],
  providers: [
  ],
  declarations: [
    FileSizePipe,
    FileIconPipe,
  ],
})
export class SharedModule { }
