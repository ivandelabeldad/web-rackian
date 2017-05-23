import { Inject, Input } from '@angular/core';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

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
  @Output()
  public onChangeFolder: EventEmitter<Folder> = new EventEmitter<Folder>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  selectResource(resource: File|Folder) {
    this.selectedResource = resource;
    this.onSelectResource.emit(this.selectedResource);
  }

  changeFolder(folder: Folder) {
    this.router.navigate(['/storage/folder/' + folder.id]);
  }
}
