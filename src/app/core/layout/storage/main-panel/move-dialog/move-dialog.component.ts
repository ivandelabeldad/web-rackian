import { Component, Input, OnInit } from '@angular/core';

import { File } from '../../resources/File';

@Component({
  selector: 'rackian-move-dialog',
  templateUrl: './move-dialog.component.html',
  styleUrls: ['./move-dialog.component.scss']
})
export class MoveDialogComponent implements OnInit {

  @Input()
  public file: File;

  constructor() {
  }

  ngOnInit() {
  }

}
