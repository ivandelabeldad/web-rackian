import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { LayoutComponent } from './core/layout/layout.component';


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
