import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { AuthHttpService } from '../../../../shared/authentication/auth-http.service';
import { conf } from '../../../../conf';
import { File as FileResource } from '../resources/file';
import { Folder } from '../resources/folder';
import { FolderDialogComponent } from './folder-dialog/folder-dialog.component';
import { FolderService } from '../resources/folder.service';
import { User } from '../../../../shared/authentication/user';


@Component({
  selector: 'rackian-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {

  user: User;
  @Output()
  public onUploadFile: EventEmitter<FileResource> = new EventEmitter<FileResource>();
  @Output()
  public onCreateFolder: EventEmitter<Folder> = new EventEmitter<Folder>();

  constructor(
    private folderService: FolderService,
    private userService: User,
    private http: AuthHttpService,
    private activatedRoute: ActivatedRoute,
    private dialog: MdDialog
  ) { }

  ngOnInit() {
    this.user = this.userService;
  }

  fileUpload(evt) {
    const fileList: FileList = evt.target.files;
    if (fileList.length <= 0) {
      return;
    }
    this.activatedRoute.url.subscribe(route => {
      let folder = null;
      if (route[route.length - 1].path !== 'storage') {
        folder = Folder.urlById(route[route.length - 1].path);
      }
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('link', file);
      formData.append('mime_type', file.type);
      if (folder) {
        formData.append('folder', folder);
      }
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      this.http.post(`${conf.url.api.files}`, formData, { headers })
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
          data => {
            const newFile = FileResource.createFromJson(data);
            this.onUploadFile.emit(newFile);
          },
          error => console.log(error)
        );
    });
  }

  createFolder() {
    const dialogRef = this.dialog.open(FolderDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (!result) {
          return;
        }
        this.activatedRoute.url.subscribe(route => {
          const folder = new Folder();
          if (route[route.length - 1].path !== 'storage') {
            folder.parent_folder = new URL(Folder.urlById(route[route.length - 1].path));
          }
          folder.name = result;
          this.folderService.create(folder).subscribe(resultFolder => {
            this.onCreateFolder.emit(resultFolder);
          }, error => {
            console.log(error);
          });
        });
      });
  }

}
