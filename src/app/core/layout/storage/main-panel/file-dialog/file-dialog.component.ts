import { MdDialogRef } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

import { MainPanelComponent } from '../main-panel.component';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'rackian-file-dialog',
  templateUrl: './file-dialog.component.html',
  styleUrls: ['./file-dialog.component.scss'],
})
export class FileDialogComponent implements OnInit {

  constructor(
    public dialogRef: MdDialogRef<MainPanelComponent>,
    @Inject(MD_DIALOG_DATA) public urlObject: any,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.urlObject = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlObject);
  }

  close() {
    this.dialogRef.close();
  }

}
