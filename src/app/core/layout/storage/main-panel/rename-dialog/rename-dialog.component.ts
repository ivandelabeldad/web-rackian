import { MdDialogRef } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

import { MainMenuComponent } from '../../main-menu/main-menu.component';
import { File } from '../../resources/file';
import { Folder } from '../../resources/folder';


@Component({
  selector: 'rackian-rename-dialog',
  templateUrl: './rename-dialog.component.html',
  styleUrls: ['./rename-dialog.component.scss'],
})
export class RenameDialogComponent implements OnInit {

  public nameError: boolean;

  constructor(
    public dialogRef: MdDialogRef<MainMenuComponent>,
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
    this.resource.name = name;
    this.dialogRef.close(this.resource);
  }

  cancel() {
    this.dialogRef.close(null);
  }

  removeError() {
    this.nameError = false;
  }

}
