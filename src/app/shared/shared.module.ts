import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ClipboardModule } from 'ngx-clipboard/dist';

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
    ClipboardModule,
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
