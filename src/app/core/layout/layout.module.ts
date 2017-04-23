import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LayoutComponent } from './layout.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from './material/material.module';


@NgModule({
  imports: [
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  exports: [
    LayoutComponent,
  ],
  declarations: [
    LayoutComponent,
  ],
})
export class LayoutModule {
}
