import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  public files: File[];
  public folders: Folder[];
  public selectedResource: File|Folder;

  constructor(private fileService: FileService, private folderService: FolderService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.files = [];
    this.folders = [];
    this.activatedRoute.url.subscribe(r => {
      if (r[r.length - 1].path === 'storage') {
        this.updateResources();
      } else {
        const folder = new Folder();
        folder.id = r[r.length - 1].path;
        this.updateResources(folder);
      }
    });
  }

  updateResources(folder?: Folder) {
    this.fileService.getFiles(folder).subscribe(files => this.files = files);
    this.folderService.getFolders(folder).subscribe(folders => this.folders = folders);
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

  onChangeFolder(resource: Folder) {
    this.updateResources(resource);
  }
}
