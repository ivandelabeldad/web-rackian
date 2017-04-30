import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  exports: [
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  declarations: []
})
export class LayoutSharedModule { }
