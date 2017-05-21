import { NgModule } from '@angular/core';

import { StorageComponent } from './storage.component';
import { SharedModule } from '../../../shared/shared.module';
import { LayoutSharedModule } from '../shared/layout-shared.module';
import { BreadcumsComponent } from './breadcums/breadcums.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { MainBarComponent } from './main-menu/main-menu.component';
import { ResourcesModule } from './resources/resources.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    LayoutSharedModule,
    ResourcesModule,
    RouterModule,
  ],
  declarations: [
    StorageComponent,
    MainBarComponent,
    MainPanelComponent,
    InfoPanelComponent,
    BreadcumsComponent,
    StorageComponent,
  ],
})
export class MainModule { }
