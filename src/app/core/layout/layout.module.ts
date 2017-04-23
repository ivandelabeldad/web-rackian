import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LayoutComponent } from './layout.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from './material/material.module';
import { LoadingComponent } from './loading/loading.component';
import { MainBarComponent } from './main-menu/main-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionsPanelComponent } from './actions-panel/actions-panel.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { MobileBarComponent } from './mobile-menu/mobile-menu.component';


@NgModule({
  imports: [
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  exports: [
    LayoutComponent,
  ],
  declarations: [
    LayoutComponent,
    LoadingComponent,
    MainBarComponent,
    ActionsPanelComponent,
    MainPanelComponent,
    InfoPanelComponent,
    MobileBarComponent,
  ],
})
export class LayoutModule {
}
