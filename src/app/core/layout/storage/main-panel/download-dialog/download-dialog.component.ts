import { Component, Input, OnInit } from '@angular/core';

import { File } from '../../resources/File';

@Component({
  selector: 'rackian-download-dialog',
  templateUrl: './download-dialog.component.html',
  styleUrls: ['./download-dialog.component.scss']
})
export class DownloadDialogComponent implements OnInit {

  @Input()
  public file: File;

  constructor() {
  }

  ngOnInit() {
  }

}
