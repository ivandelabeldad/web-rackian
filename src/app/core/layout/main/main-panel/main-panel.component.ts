import { Inject, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { File } from '../resources/file';
import { Folder } from '../resources/folder';

@Component({
  selector: 'rackian-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {

  @Input()
  private files: File[];
  @Input()
  private folders: Folder[];

  constructor() { }

  ngOnInit() {
  }

}
