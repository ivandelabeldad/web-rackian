import { Component, OnInit } from '@angular/core';

import { FileService } from '../resources/file.service';
import { Folder } from '../resources/folder';
import { File } from '../resources/file';
import { FolderService } from '../resources/folder.service';


@Component({
  selector: 'rackian-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {

  private files: File[];
  private folders: Folder[];

  constructor(private fileService: FileService, private folderService: FolderService) { }

  ngOnInit() {
    this.fileService.getFiles().subscribe(files => this.files = files);
    this.folderService.getFolders().subscribe(folders => this.folders = folders);
  }

}
