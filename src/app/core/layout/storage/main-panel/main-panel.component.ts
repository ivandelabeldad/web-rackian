import { Input } from '@angular/core';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import * as FileSaver from 'file-saver';

import { File } from '../resources/file';
import { Folder } from '../resources/folder';
import { FileService } from '../resources/file.service';
import { FolderService } from '../resources/folder.service';
import { FileDialogComponent } from './file-dialog/file-dialog.component';
import { RenameDialogComponent } from './rename-dialog/rename-dialog.component';
import { MoveDialogComponent } from './move-dialog/move-dialog.component';


@Component({
  selector: 'rackian-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {

  @Input()
  public files: File[];
  @Input()
  public folders: Folder[];
  @Input()
  public selectedResource: File|Folder;
  @Output()
  public onSelectResource: EventEmitter<File|Folder> = new EventEmitter<File|Folder>();
  @Output()
  public onChangeFolder: EventEmitter<Folder> = new EventEmitter<Folder>();
  public downloadingFile: File;

  constructor(
    private router: Router,
    private fileService: FileService,
    private folderService: FolderService,
    private dialog: MdDialog,
  ) { }

  ngOnInit() {
  }

  selectResource(resource: File|Folder) {
    this.selectedResource = resource;
    this.onSelectResource.emit(this.selectedResource);
  }

  changeFolder(folder: Folder) {
    this.router.navigate(['/storage/folder/' + folder.id]);
  }

  openFile(file: File) {
    if (!file.isRenderable()) {
      this.downloadFile(file);
      return;
    }
    this.fileService.getFileData(file).subscribe(blob => {
      const urlObject = URL.createObjectURL(blob);
      this.dialog.open(FileDialogComponent, {
        data: urlObject,
        height: '90vh',
        width: '90vw',
      });
    });
  }

  downloadFile(file: File) {
    this.downloadingFile = file;
    this.fileService.getFileData(file).subscribe(blob => {
      FileSaver.saveAs(blob, file.name + file.extension, true);
    }, e => console.log(e),
      () => this.downloadingFile = null);
  }

  deleteFolder(folder: Folder) {
    this.folderService.remove(folder).subscribe(() => {
      this.folders = this.folders.filter(f => f.id !== folder.id);
    }, error => {
      console.log(error);
    });
  }

  deleteFile(file: File) {
    this.fileService.remove(file).subscribe(() => {
      this.files = this.files.filter(f => f.id !== file.id);
    }, error => {
      console.log(error);
    });
  }

  rename(resource: File|Folder) {
    const dialog = this.dialog.open(RenameDialogComponent, {
      data: resource,
    });
    dialog.afterClosed().subscribe(resourceModified => {
      if (resourceModified instanceof File) {
        this.fileService.update(resourceModified).subscribe(s => console.log(s), e => console.log(e));
      }
      if (resourceModified instanceof Folder) {
        this.folderService.update(resourceModified).subscribe(s => console.log(s), e => console.log(e));
      }
    });
  }

  move(resource: File|Folder) {
    const dialog = this.dialog.open(MoveDialogComponent, {
      data: resource,
      height: '350px',
      width: '280px',
    });
    dialog.afterClosed().subscribe(r => {
      if (r instanceof File) {
        this.files = this.files.filter(file => file.id !== r.id);
      }
      if (r instanceof Folder) {
        this.folders = this.folders.filter(folder => folder.id !== r.id);
      }
    });
  }
}
