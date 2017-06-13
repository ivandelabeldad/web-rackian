import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareService } from './share.service';
import * as FileSaver from 'file-saver';
import { InfoDialogService } from '../../info-dialog/info-dialog.service';

@Component({
  selector: 'rackian-share-file',
  template: ' ',
})
export class ShareFileComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private shareService: ShareService,
              private infoDialogService: InfoDialogService) {
  }

  ngOnInit() {
    this.infoDialogService.init('Downloading File', 'Your file is being donwloaded...');

    this.activatedRoute.url.subscribe(route => {
      const id = route[route.length - 1].path;
      this.shareService.getFileData(id).subscribe(
          object => {
            FileSaver.saveAs(object.blob, object.filename, false);
            this.infoDialogService.finish('File Downloaded', 'The file has been downloaded successfully.');
          },
          error => {
            this.infoDialogService.finishWithErrors('Error', 'There was an error downloading this file.');
          }
      );
    }, error => {});
  }

}
