import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from './material/material.module';
import { LoadingComponent } from './loading/loading.component';
import { MainBarComponent } from './main-menu/main-menu.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { BreadcumsComponent } from './breadcums/breadcums.component';
import { StorageComponent } from './storage/storage.component';
import { LoginComponent } from './login/login.component';
import { AuthenticatedGuard } from '../../shared/AuthenticatedGuard';


const routes: Routes = [
  { path: '', redirectTo: 'storage', pathMatch: 'full' },
  { path: 'storage', component: StorageComponent, canActivate: [AuthenticatedGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    LayoutComponent,
    RouterModule,
  ],
  declarations: [
    LayoutComponent,
    LoadingComponent,
    MainBarComponent,
    MainPanelComponent,
    InfoPanelComponent,
    BreadcumsComponent,
    StorageComponent,
    LoginComponent,
  ],
})
export class LayoutModule {
}
