import { Injectable } from '@angular/core';
import { ResponseContentType, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Folder } from './folder';
import { AuthHttpService } from '../../../../shared/authentication/auth-http.service';
import { conf } from '../../../../conf';
import { File } from './file';
import { ShareService } from '../share/share.service';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class FileService {

  constructor(private http: AuthHttpService, private shareService: ShareService) { }

  getFiles(folder?: Folder, url?: string): Observable<File[]> {
    folder = folder || new Folder();
    url = url || `${conf.url.api.files}?folder=${folder.id}`;

    const subject = new Subject();

    this.getFilesPackage(subject, folder, url);

    return subject;
  }

  getFilesPackage(subject: Subject<any>, folder?: Folder, url?: string) {
    folder = folder || new Folder();
    url = url || `${conf.url.api.files}?folder=${folder.id}`;

    this.http.get(url)
      .map(res => res.json())
      .subscribe(data => {
        const files = data.results.map(e => File.createFromJson(e));
        const elements = files.length;
        let processed = 0;
        files.forEach(file => {
          this.shareService.getShareFile(file).subscribe(fileLink => {
            file.share = fileLink;
            subject.next([file]);
            processed++;
            if (processed === elements && !data.next) {
              subject.complete();
            }
          });
        });
        if (data.next) {
          this.getFilesPackage(subject, folder, data.next);
        }
      });
  }

  getFileData(file: File): Observable<Blob> {
    const url = `${conf.url.api.downloads}${file.id}/`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url, {
      responseType: ResponseContentType.Blob,
      headers: headers,
    }).map(data => new Blob([data.blob()], { type: 'application/octet-stream' }));
  }

  remove(file: File): Observable<null> {
    const observable = this.http.delete(file.url.toString());
    return observable;
  }

  update(file: File): Observable<File> {
    return this.http.patch(file.url.toString(), file).map(response => {
      return File.createFromJson(response.json());
    });
  }

}
