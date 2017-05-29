import { MdDialogRef } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

import { MainPanelComponent } from '../main-panel.component';
import { Folder } from '../../resources/folder';
import { File } from '../../resources/file';
import { FolderService } from '../../resources/folder.service';
import { FileService } from '../../resources/file.service';


@Component({
  selector: 'rackian-move-dialog',
  templateUrl: './move-dialog.component.html',
  styleUrls: ['./move-dialog.component.scss'],
})
export class MoveDialogComponent implements OnInit {

  public initialFolder: Folder;
  public previousFolder: Folder;
  public currentFolder: Folder;
  public childFolders: Folder[];

  constructor(
    public dialogRef: MdDialogRef<MainPanelComponent>,
    @Inject(MD_DIALOG_DATA) public resource: any,
    private folderService: FolderService,
    private fileService: FileService,
  ) {}

  ngOnInit(): void {
    if (this.resource.getParentFolder()) {
      this.folderService.getParentFolder(this.resource).subscribe(folder => {
        this.currentFolder = folder;
        this.initialFolder = folder;
        this.updatePreviousFolder();
        this.updateChildFolders();
      });
    } else {
      this.updateChildFolders();
    }
  }

  changeFolder(folder: Folder) {
    this.childFolders = [];
    this.previousFolder = null;
    this.currentFolder = folder;
    this.updatePreviousFolder();
    this.updateChildFolders();
  }

  updatePreviousFolder() {
    if (!this.currentFolder) {
      this.previousFolder = null;
      return;
    }
    if (!this.currentFolder.parent_folder) {
      this.previousFolder = null;
      return;
    }
    this.folderService.getParentFolder(this.currentFolder).subscribe(folder => this.previousFolder = folder);
  }

  updateChildFolders() {
    this.folderService
      .getFolders(this.currentFolder)
      .subscribe(folders => {
        this.childFolders = folders.sort(Folder.sortByName).filter(f => f.id !== this.resource.id);
      });
  }

  move() {
    if (this.currentFolder === this.initialFolder) {
      this.dialogRef.close();
      return;
    }
    let parentFolderUrl = '';
    if (this.currentFolder) {
      parentFolderUrl = this.currentFolder.url;
    }
    if (this.resource instanceof File) {
      this.resource.folder = parentFolderUrl;
      this.fileService.update(this.resource).subscribe(file => {
        this.dialogRef.close(file);
      });
    }
    if (this.resource instanceof Folder) {
      this.resource.parent_folder = parentFolderUrl;
      this.folderService.update(this.resource).subscribe(folder => {
        this.dialogRef.close(folder);
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

}
