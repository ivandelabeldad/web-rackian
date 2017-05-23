import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../../../shared/authentication/user';
import { RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthHttpService } from '../../../../shared/authentication/auth-http.service';
import { conf } from '../../../../conf';
import { File as FileResource } from '../resources/file';
import { Folder } from '../resources/folder';

@Component({
  selector: 'rackian-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainBarComponent implements OnInit {

  user: User;
  @Output()
  public onUploadFile: EventEmitter<FileResource> = new EventEmitter<FileResource>();
  @Output()
  public onCreateFolder: EventEmitter<Folder> = new EventEmitter<Folder>();

  constructor(private userService: User, private http: AuthHttpService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = this.userService;
  }

  fileUpload(evt) {
    const fileList: FileList = evt.target.files;
    if (fileList.length <= 0) {
      return;
    }
    this.activatedRoute.url.subscribe(route => {
      let folder_id = null;
      if (route[route.length - 1].path !== 'storage') {
        folder_id = conf.url.api.folders + route[route.length - 1].path + '/';
      }
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('link', file);
      formData.append('mime_type', file.type);
      if (folder_id) formData.append('folder', folder_id);
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      const options = new RequestOptions({ headers });
      this.http.post(`${conf.url.api.files}`, formData, options)
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

}
