import { Component, OnInit, Input } from '@angular/core';
import { Folder } from '../resources/folder';
import { File } from '../resources/file';


@Component({
  selector: 'rackian-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit {

  @Input()
  public selectedResource: File|Folder;

  constructor() { }

  ngOnInit() {
  }

}
