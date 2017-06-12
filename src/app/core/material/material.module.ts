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
  MdSnackBarModule,
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
    MdSnackBarModule,
  ],
})
export class MaterialModule {
}
