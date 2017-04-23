import { NgModule } from '@angular/core';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    LayoutModule,
  ],
  exports: [
    LayoutModule,
  ],
  declarations: [],
})
export class CoreModule {
}
