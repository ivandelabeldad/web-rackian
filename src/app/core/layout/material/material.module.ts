import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdCardModule,
  MdIconModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdSliderModule,
  MdToolbarModule,
  MdSidenavModule,
} from '@angular/material';

@NgModule({
  exports: [
    MdCardModule,
    MdSliderModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdIconModule,
    MdMenuModule,
    MdButtonModule,
    MdToolbarModule,
    MdSidenavModule,
  ],
})
export class MaterialModule {
}
