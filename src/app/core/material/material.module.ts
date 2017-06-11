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
  MdInputModule,
  MdListModule,
  MdRippleModule,
  MdCheckboxModule,
  MdDialogModule,
  MdCommonModule,
  MdTooltipModule,
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
    MdInputModule,
    MdListModule,
    MdRippleModule,
    MdCheckboxModule,
    MdCardModule,
    MdDialogModule,
    MdCommonModule,
    MdTooltipModule,
  ],
})
export class MaterialModule {
}
