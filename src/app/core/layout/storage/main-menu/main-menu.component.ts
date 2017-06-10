import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Headers } from '@angular/http';
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
import { InfoDialogService } from '../../info-dialog/info-dialog.service';


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
  private parentFolder: string;

  @ViewChild('uploadInput') uploadInputElRef: ElementRef;
  @ViewChild('uploadInputMobile') uploadInputMobileElRef: ElementRef;

  constructor(private folderService: FolderService,
              private userService: User,
              private http: AuthHttpService,
              private activatedRoute: ActivatedRoute,
              private dialog: MdDialog,
              private infoDialogService: InfoDialogService) {
  }

  ngOnInit() {
    this.user = this.userService;
    this.activatedRoute.url.subscribe(route => {
      if (route[route.length - 1].path !== 'storage') {
        this.parentFolder = Folder.urlById(route[route.length - 1].path);
      } else {
        this.parentFolder = null;
      }
    });
  }

  fileUpload(evt) {
    const fileList: FileList = evt.target.files;
    if (fileList.length <= 0) {
      return;
    }
    const file: File = fileList[0];
    const fileResouce = new FileResource();
    fileResouce.name = file.name;
    fileResouce.mime_type = file.type;
    fileResouce.extension = file.name.substring(file.name.lastIndexOf('.'));

    this.infoDialogService.init('Uploading File', fileResouce);

    const formData: FormData = new FormData();
    formData.append('link', file);
    formData.append('mime_type', file.type);
    if (this.parentFolder) {
      formData.append('folder', this.parentFolder);
    }
    const headers = new Headers();
    headers.append('Accept', 'application/json');


    // CLEAN INPUT
    this.uploadInputElRef.nativeElement.value = '';
    this.uploadInputMobileElRef.nativeElement.value = '';

    if (file.size > this.user.getSpaceAvailable()) {
      this.infoDialogService.finishWithErrors('Error', 'Not enough space.');
      return;
    }

    this.http.post(`${conf.url.api.files}`, formData, { headers })
      .map(res => res.json())
      .catch(error => Observable.throw(error))
      .subscribe(
        data => {
          const newFile = FileResource.createFromJson(data);
          this.onUploadFile.emit(newFile);
          this.user.setSpace(this.user.getSpace() + newFile.size);

          this.infoDialogService.finish('File Uploaded', 'File uploaded successfully.');
        },
        (error) => {
          console.log(error);
          if (error.json().error === 'Not enough space') {
            this.infoDialogService.finishWithErrors('Error', 'Not enough space.');
          } else {
            this.infoDialogService.finishWithErrors('Error', 'There was some problem uploading the file.');
          }
        }
      );
  }

  createFolder() {
    const dialogRef = this.dialog.open(FolderDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      const folder = new Folder();
      if (this.parentFolder) {
        folder.parent_folder = this.parentFolder;
      }
      folder.name = result;
      this.folderService.create(folder).subscribe(resultFolder => {
        this.onCreateFolder.emit(resultFolder);
      }, error => {
        console.log(error);
      });
    });
  }

}
