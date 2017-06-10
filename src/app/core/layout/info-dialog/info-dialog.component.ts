import { Component, Input, OnInit } from '@angular/core';

import { File } from '../storage/resources/file';
import { DialogStatus } from './dialog-status';
import { Folder } from '../storage/resources/folder';
import { InfoDialogService } from './info-dialog.service';


@Component({
  selector: 'rackian-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {

  @Input()
  public resource: File | Folder;
  public title: string;
  public message: string;
  public status: DialogStatus;
  public show: boolean;

  constructor(private service: InfoDialogService) {
  }

  ngOnInit() {
    this.service.subscribe(() => {
      this.resource = this.service.getResource();
      this.title = this.service.getTitle();
      this.message = this.service.getMessage();
      this.status = this.service.getStatus();
      this.show = this.service.getShow();
    });
  }

  close() {
    this.show = false;
  }

}
