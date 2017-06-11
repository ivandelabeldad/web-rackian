import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MdTooltip } from '@angular/material';

import { Folder } from '../resources/folder';
import { File } from '../resources/file';
import { User } from '../../../../shared/authentication/user';


@Component({
  selector: 'rackian-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit {

  @Input() public selectedResource: File|Folder;
  @ViewChild(MdTooltip) public tooltip: MdTooltip;

  public spacePercentage = 0;

  constructor(public user: User) { }

  ngOnInit() {
    this.tooltip.disabled = true;
    this.tooltip.hideDelay = 999999999;
    this.tooltip.showDelay = 999999999;
    console.log(this.tooltip);
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

  showTooltip() {
    this.tooltip.disabled = false;
    setTimeout(() => this.tooltip.show(0), 50);
    setTimeout(() => this.tooltip.disabled = true, 2000);
  }

}
