import { NgModule } from '@angular/core';
import { FileService } from './file.service';
import { FolderService } from './folder.service';


@NgModule({
  imports: [
  ],
  declarations: [],
  providers: [
    FileService,
    FolderService,
  ],
})
export class ResourcesModule { }
