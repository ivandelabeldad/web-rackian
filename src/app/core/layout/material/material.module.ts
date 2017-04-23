import { NgModule } from '@angular/core';
import { MdCardModule, MdProgressBarModule, MdSliderModule } from '@angular/material';

@NgModule({
  exports: [
    MdCardModule,
    MdSliderModule,
    MdProgressBarModule,
  ],
})
export class MaterialModule {
}
