import { Input } from '@angular/core';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import * as FileSaver from 'file-saver';

import { File } from '../resources/file';
import { Folder } from '../resources/folder';
import { FileService } from '../resources/file.service';
import { FolderService } from '../resources/folder.service';
import { FileDialogComponent } from './file-dialog/file-dialog.component';
import { RenameDialogComponent } from './rename-dialog/rename-dialog.component';
import { MoveDialogComponent } from './move-dialog/move-dialog.component';
import { User } from '../../../../shared/authentication/user';
import { InfoDialogService } from '../../info-dialog/info-dialog.service';
import { ShareService } from '../share/share.service';


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
  public selectedResource: File | Folder;
  @Output()
  public onSelectResource: EventEmitter<File | Folder> = new EventEmitter<File | Folder>();
  @Output()
  public onChangeFolder: EventEmitter<Folder> = new EventEmitter<Folder>();
  public downloadingFile: File;

  constructor(private router: Router,
              private fileService: FileService,
              private folderService: FolderService,
              private dialog: MdDialog,
              private user: User,
              private infoDialogService: InfoDialogService,
              private shareService: ShareService) {
  }

  ngOnInit() {
  }

  selectResource(resource: File | Folder) {
    this.selectedResource = resource;
    this.onSelectResource.emit(this.selectedResource);
  }

  changeFolder(folder: Folder) {
    this.router.navigate(['/storage/folder/' + folder.id]);
  }

  openFile(file: File) {
    if (!file.isRenderable()) {
      this.downloadFile(file);
      return;
    }
    this.fileService.getFileData(file).subscribe(blob => {
      const urlObject = URL.createObjectURL(blob);
      this.dialog.open(FileDialogComponent, {
        data: urlObject,
        height: '90vh',
        width: '90vw',
      });
    });
  }

  downloadFile(file: File) {
    this.infoDialogService.init('Downloading File', file);
    this.fileService.getFileData(file).subscribe(blob => {
      FileSaver.saveAs(blob, file.name + file.extension, true);
      this.infoDialogService.finish('File Downloaded', 'File downloaded successfully.');
    }, e => {
      this.infoDialogService.finishWithErrors('Error', 'There was some problem downloading the file. Try it later.');
    });
  }

  downloadFolder(folder: Folder) {
    this.infoDialogService.init('Downloading Folder', folder);
    this.folderService.getFolderData(folder).subscribe(blob => {
      FileSaver.saveAs(blob, folder.name + '.zip', true);
      this.infoDialogService.finish('Folder downloaded', 'Folder downloaded successfully.');
    }, () => {
      this.infoDialogService.finishWithErrors('Error', 'There was some problem downloading the folder.');
    });
  }

  deleteFolder(folder: Folder) {
    this.folderService.remove(folder).subscribe(() => {
      this.folders.splice(this.folders.indexOf(folder), 1);
    }, error => {
      console.log(error);
    });
  }

  deleteFile(file: File) {
    this.fileService.remove(file).subscribe(() => {
      this.files.splice(this.files.indexOf(file), 1);
      this.user.setSpace(this.user.getSpace() - file.size);
    }, error => {
      console.log(error);
    });
  }

  rename(resource: File | Folder) {
    const dialog = this.dialog.open(RenameDialogComponent, {
      data: resource,
    });
    dialog.afterClosed().subscribe(resourceModified => {
      if (resourceModified instanceof File) {
        this.fileService.update(resourceModified).subscribe(s => console.log(s), e => console.log(e));
      }
      if (resourceModified instanceof Folder) {
        this.folderService.update(resourceModified).subscribe(s => console.log(s), e => console.log(e));
      }
    });
  }

  move(resource: File | Folder) {
    const dialog = this.dialog.open(MoveDialogComponent, {
      data: resource,
      height: '350px',
      width: '280px',
    });
    dialog.afterClosed().subscribe(r => {
      if (r instanceof File) {
        this.files = this.files.filter(file => file.id !== r.id);
      }
      if (r instanceof Folder) {
        this.folders = this.folders.filter(folder => folder.id !== r.id);
      }
    });
  }

  shareFile(file: File) {
    const obs = {
      next: shareFile => {
        file.share = shareFile;
        this.infoDialogService.finish('File shared', shareFile.getRealLink());
      },
      error: value => {
        this.infoDialogService.finishWithErrors('Error', 'The file cannot be shared.');
      }
    };
    this.infoDialogService.init('Sharing file', file);
    this.shareService.create(file).subscribe(obs);
  }

  stopShareFile(file: File) {
    const obs = {
      next: () => {
        file.share = null;
        this.infoDialogService.finish('Link deleted', 'The link was deleted successfully.');
      },
      error: () => {
        this.infoDialogService.finishWithErrors('Error', 'The link cannot be deleted.');
      }
    };
    this.infoDialogService.init('Removing shared link', file);
    this.shareService.remove(file.share).subscribe(obs);
  }
}
