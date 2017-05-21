import { Component, OnInit, Output } from '@angular/core';

import { Folder } from './resources/folder';
import { File } from './resources/file';
import { FolderService } from './resources/folder.service';
import { FileService } from './resources/file.service';

@Component({
  selector: 'rackian-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {

  public resources: any = [];
  public files: File[];
  public folders: Folder[];
  public selectedResource: File|Folder;

  constructor(private fileService: FileService, private folderService: FolderService) { }

  ngOnInit() {
    this.resources.push(new File());
    this.fileService.getFiles().subscribe(files => this.resources = [...this.resources, ...files]);
    this.fileService.getFiles().subscribe(files => this.files = files);
    this.fileService.getFiles().subscribe(files => this.files = files);
    this.folderService.getFolders().subscribe(folders => this.folders = folders);
  }

  onSelectResource(resource: File|Folder) {
    this.selectedResource = resource;
  }

  onUploadFile(resource: File) {
    this.files.push(resource);
  }

  onCreateFolder(resource: Folder) {
    this.folders.push(resource);
  }
}
