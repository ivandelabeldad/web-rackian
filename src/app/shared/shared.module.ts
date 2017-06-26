import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ClipboardModule } from 'ngx-clipboard/dist';

import { SharedAuthenticationModule } from './authentication/authentication.module';
import { FileIconPipe } from './file-icon.pipe';
import { FileSizePipe } from './file-size.pipe';
import { KeyboardService } from './keyboard.service';


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
    KeyboardService,
  ],
  declarations: [
    FileSizePipe,
    FileIconPipe,
  ],
})
export class SharedModule { }
