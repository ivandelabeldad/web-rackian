import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { LayoutComponent } from './core/layout/layout.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [LayoutComponent],
})
export class AppModule {
}
