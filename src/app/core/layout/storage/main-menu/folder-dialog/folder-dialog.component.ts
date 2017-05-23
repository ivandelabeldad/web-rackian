import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';
import { MainMenuComponent } from '../main-menu.component';


@Component({
  selector: 'rackian-folder-dialog',
  templateUrl: './folder-dialog.html',
  styleUrls: ['./folder-dialog.scss'],
})
export class FolderDialogComponent {

  public nameError: boolean;

  constructor(public dialogRef: MdDialogRef<MainMenuComponent>) {}

  create(value?: string) {
    if (!value) {
      this.nameError = true;
      return;
    }
    this.dialogRef.close(value);
  }
  cancel() {
    this.dialogRef.close(null);
  }
  removeError() {
    this.nameError = false;
  }
}
