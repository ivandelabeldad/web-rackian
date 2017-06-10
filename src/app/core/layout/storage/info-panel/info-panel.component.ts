import { Component, OnInit, Input } from '@angular/core';

import { Folder } from '../resources/folder';
import { File } from '../resources/file';
import { User } from '../../../../shared/authentication/user';


@Component({
  selector: 'rackian-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit {

  @Input()
  public selectedResource: File|Folder;

  public spacePercentage = 0;

  constructor(public user: User) { }

  ngOnInit() {
    this.updateSpacePercentage();
    this.user.getSpaceObservable().subscribe(() => this.updateSpacePercentage());
  }

  updateSpacePercentage() {
    let space = 100 - Math.round(this.user.getSpaceAvailable() / this.user.getSpaceTotal() * 100);
    if (isNaN(space)) {
      space = 0;
    }
    this.spacePercentage = space;
  }

}
