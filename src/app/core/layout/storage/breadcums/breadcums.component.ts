import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Folder } from '../resources/folder';
import { FolderService } from '../resources/folder.service';

@Component({
  selector: 'rackian-breadcums',
  templateUrl: './breadcums.component.html',
  styleUrls: ['./breadcums.component.scss']
})
export class BreadcumsComponent implements OnInit {

  public parentFolders: Folder[];

  constructor(private activatedRoute: ActivatedRoute, private folderService: FolderService) { }

  ngOnInit() {
    this.generateBreadCrumbs();
  }

  generateBreadCrumbs() {
    this.activatedRoute.url.subscribe(r => {
      if (r[r.length - 1].path === 'storage') {
        this.parentFolders = [];
      } else {
        const folder = new Folder();
        folder.id = r[r.length - 1].path;
        this.folderService.getParentFolders(folder).subscribe(folders => {
          this.parentFolders = folders;
        });
      }
    });
  }

}
