import { Component, OnInit } from '@angular/core';
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

  constructor(private fileService: FileService,
              private folderService: FolderService,
              private activatedRoute: ActivatedRoute) { }

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
    this.initArrowNavigation();
  }

  updateResources(folder?: Folder) {
    this.folders = [];
    this.folderService.getFolders(folder).subscribe(
      folders => {
        this.folders.push(...folders);
        this.folders = this.folders.sort(Folder.sortByName);
      },
      error => console.log(error),
    );

    this.files = [];
    this.fileService.getFiles(folder).subscribe(
      files => {
        this.files.push(...files);
        this.files = this.files.sort(File.sortByName);
      },
      error => console.log(error),
    );
  }

  onSelectResource(resource: File|Folder) {
    this.selectedResource = resource;
  }

  onUploadFile(resource: File) {
    this.files.push(resource);
    this.files.sort(File.sortByName);
  }

  onCreateFolder(resource: Folder) {
    this.folders.push(resource);
    this.folders.sort(Folder.sortByName);
  }

  onChangeFolder(resource: Folder) {
    this.updateResources(resource);
  }

  initArrowNavigation() {
    window.addEventListener('keydown', (evt) => {
      if (this.files.length === 0 && this.folders.length === 0) {
        return;
      }
      if (evt.key === 'ArrowUp') {
        return this.up();
      }
      if (evt.key === 'ArrowDown') {
        return this.down();
      }
    });
  }

  up() {
    const resources = [...this.folders, ...this.files];
    if (!this.selectedResource) {
      this.selectedResource = resources[0];
      return;
    }
    let previousIndex = -1;
    resources.forEach((resource, i) => {
      if (resource.id === this.selectedResource.id) {
        previousIndex = i - 1;
      }
    });
    if (previousIndex >= 0) {
      this.selectedResource = resources[previousIndex];
    }
  }

  down() {
    const resources = [...this.folders, ...this.files];
    if (!this.selectedResource) {
      this.selectedResource = resources[0];
      return;
    }
    let nextIndex = resources.length;
    resources.forEach((resource, i) => {
      if (resource.id === this.selectedResource.id) {
        nextIndex = i + 1;
      }
    });
    if (nextIndex < resources.length) {
      this.selectedResource = resources[nextIndex];
    }
  }
}
