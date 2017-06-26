import { MdDialogRef } from '@angular/material';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { MainMenuComponent } from '../main-menu.component';
import { KeyboardService } from '../../../../../shared/keyboard.service';


@Component({
  selector: 'rackian-folder-dialog',
  templateUrl: './folder-dialog.html',
  styleUrls: ['./folder-dialog.scss'],
})
export class FolderDialogComponent implements OnInit, OnDestroy {

  public nameError: boolean;

  constructor(public dialogRef: MdDialogRef<MainMenuComponent>, private keyboardService: KeyboardService) {}

  ngOnInit(): void {
    this.keyboardService.disableEnterEvt();
  }

  ngOnDestroy(): void {
    this.keyboardService.enableEnterEvt();
  }

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
