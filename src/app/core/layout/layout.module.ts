import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { SharedModule } from '../../shared/shared.module';
import { LoadingComponent } from './loading/loading.component';
import { MainBarComponent } from './main-menu/main-menu.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { BreadcumsComponent } from './breadcums/breadcums.component';
import { StorageComponent } from './storage/storage.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticatedGuard } from '../../shared/authentication/authenticated.guard';
import { LoginModule } from './authentication/authentication.module';
import { LayoutSharedModule } from './shared/layout-shared.module';
import { LogoutComponent } from './authentication/logout/logout.component';


const routes: Routes = [
  { path: '', redirectTo: 'storage', pathMatch: 'full' },
  { path: 'storage', component: StorageComponent, canActivate: [AuthenticatedGuard], pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthenticatedGuard], pathMatch: 'full' },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthenticatedGuard], pathMatch: 'full' },
];

@NgModule({
  imports: [
    SharedModule,
    LayoutSharedModule,
    LoginModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
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
  ],
})
export class LayoutModule {
}
