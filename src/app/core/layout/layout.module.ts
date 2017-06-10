import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { SharedModule } from '../../shared/shared.module';
import { LoadingComponent } from './loading/loading.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticatedGuard } from '../../shared/authentication/authenticated.guard';
import { LoginModule } from './authentication/authentication.module';
import { LayoutSharedModule } from './shared/layout-shared.module';
import { LogoutComponent } from './authentication/logout/logout.component';
import { StorageComponent } from './storage/storage.component';
import { MainModule } from './storage/storage.module';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { InfoDialogService } from './info-dialog/info-dialog.service';


const routes: Routes = [
  { path: '', redirectTo: 'storage', pathMatch: 'full' },
  { path: 'storage', component: StorageComponent, canActivate: [AuthenticatedGuard], pathMatch: 'full' },
  { path: 'storage/folder/:id', component: StorageComponent, canActivate: [AuthenticatedGuard], pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthenticatedGuard], pathMatch: 'full' },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthenticatedGuard], pathMatch: 'full' },
];

@NgModule({
  imports: [
    SharedModule,
    LayoutSharedModule,
    LoginModule,
    MainModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
  declarations: [
    LayoutComponent,
    LoadingComponent,
    InfoDialogComponent,
  ],
  entryComponents: [
    InfoDialogComponent,
  ],
  providers: [
    InfoDialogService,
  ],
})
export class LayoutModule {
}
