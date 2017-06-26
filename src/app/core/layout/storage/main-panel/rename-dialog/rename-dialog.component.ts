import { MdDialogRef } from '@angular/material';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

import { MainMenuComponent } from '../../main-menu/main-menu.component';
import { File } from '../../resources/file';
import { Folder } from '../../resources/folder';
import {FileService} from '../../resources/file.service';
import {FolderService} from '../../resources/folder.service';
import {InfoDialogService} from '../../../info-dialog/info-dialog.service';
import { KeyboardService } from '../../../../../shared/keyboard.service';


@Component({
  selector: 'rackian-rename-dialog',
  templateUrl: './rename-dialog.component.html',
  styleUrls: ['./rename-dialog.component.scss'],
})
export class RenameDialogComponent implements OnInit, OnDestroy {

  public nameError: boolean;

  constructor(
    public dialogRef: MdDialogRef<MainMenuComponent>,
    private fileService: FileService,
    private folderService: FolderService,
    private infoDialogService: InfoDialogService,
    private keyboardService: KeyboardService,
    @Inject(MD_DIALOG_DATA) public resource: any,
  ) {
  }

  ngOnInit(): void {
    this.keyboardService.disableEnterEvt();
  }

  ngOnDestroy(): void {
    this.keyboardService.enableEnterEvt();
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
