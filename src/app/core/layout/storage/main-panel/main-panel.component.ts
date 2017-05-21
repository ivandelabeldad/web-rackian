import { Inject, Input } from '@angular/core';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { File } from '../resources/file';
import { Folder } from '../resources/folder';


@Component({
  selector: 'rackian-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {

  @Input()
  public files: File[];
  @Input()
  public folders: Folder[];
  @Input()
  public selectedResource: File|Folder;
  @Output()
  public onSelectResource: EventEmitter<File|Folder> = new EventEmitter<File|Folder>();

  constructor() { }

  ngOnInit() {
  }

  selectResource(resource: File|Folder) {
    this.selectedResource = resource;
    this.onSelectResource.emit(this.selectedResource);
  }

}
