import { MdDialogRef } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

import { MainMenuComponent } from '../../main-menu/main-menu.component';
import { File } from '../../resources/file';
import { Folder } from '../../resources/folder';
import {FileService} from '../../resources/file.service';
import {FolderService} from '../../resources/folder.service';
import {InfoDialogService} from '../../../info-dialog/info-dialog.service';
import {resource} from 'selenium-webdriver/http';


@Component({
  selector: 'rackian-rename-dialog',
  templateUrl: './rename-dialog.component.html',
  styleUrls: ['./rename-dialog.component.scss'],
})
export class RenameDialogComponent implements OnInit {

  public nameError: boolean;

  constructor(
    public dialogRef: MdDialogRef<MainMenuComponent>,
    private fileService: FileService,
    private folderService: FolderService,
    private infoDialogService: InfoDialogService,
    @Inject(MD_DIALOG_DATA) public resource: any,
  ) {
  }

  ngOnInit(): void {
  }

  save(name?: string) {
    if (!name) {
      this.nameError = true;
      return;
    }
    const obs = {
      next: resource => {
        this.resource.update(resource);
      },
      error: () => {
        this.infoDialogService.finishWithErrors('Error', 'There was some error changing the name.');
      }
    };
    let resourceModified;
    if (this.resource instanceof File) {
      resourceModified = new File();
      resourceModified.update(this.resource);
      resourceModified.name = name;
      this.fileService.update(resourceModified).subscribe(obs);
    }
    if (this.resource instanceof Folder) {
      resourceModified = new Folder();
      resourceModified.update(this.resource);
      resourceModified.name = name;
      this.folderService.update(resourceModified).subscribe(obs);
    }
    this.dialogRef.close(this.resource);
  }

  cancel() {
    this.dialogRef.close(null);
  }

  removeError() {
    this.nameError = false;
  }

}
