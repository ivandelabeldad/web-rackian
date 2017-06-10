import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StorageComponent } from './storage.component';
import { SharedModule } from '../../../shared/shared.module';
import { LayoutSharedModule } from '../shared/layout-shared.module';
import { BreadcumsComponent } from './breadcums/breadcums.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ResourcesModule } from './resources/resources.module';
import { FolderDialogComponent } from './main-menu/folder-dialog/folder-dialog.component';
import { FileDialogComponent } from './main-panel/file-dialog/file-dialog.component';
import { RenameDialogComponent } from './main-panel/rename-dialog/rename-dialog.component';
import { UploadDialogComponent } from './main-menu/upload-dialog/upload-dialog.component';
import { MoveDialogComponent } from './main-panel/move-dialog/move-dialog.component';


@NgModule({
  imports: [
    SharedModule,
    LayoutSharedModule,
    ResourcesModule,
    RouterModule,
  ],
  declarations: [
    StorageComponent,
    MainMenuComponent,
    MainPanelComponent,
    InfoPanelComponent,
    BreadcumsComponent,
    StorageComponent,
    FolderDialogComponent,
    FileDialogComponent,
    RenameDialogComponent,
    UploadDialogComponent,
    MoveDialogComponent,
  ],
  entryComponents: [
    FolderDialogComponent,
    FileDialogComponent,
    RenameDialogComponent,
    MoveDialogComponent,
  ],
})
export class MainModule { }
