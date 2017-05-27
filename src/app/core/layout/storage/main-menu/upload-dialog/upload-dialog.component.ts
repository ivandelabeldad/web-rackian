import { Component, Input, OnInit } from '@angular/core';

import { File } from '../../resources/File';

@Component({
  selector: 'rackian-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {

  @Input()
  public file: File;

  constructor() {
  }

  ngOnInit() {
  }

}
