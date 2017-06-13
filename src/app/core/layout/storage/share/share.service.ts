import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { File } from '../resources/file';
import { conf } from '../../../../conf';
import { AuthHttpService } from '../../../../shared/authentication/auth-http.service';
import { ShareFile } from './share-file';
import { ResponseContentType, Headers } from '@angular/http';


@Injectable()
export class ShareService {

  constructor(private http: AuthHttpService) {}

  getFileData(id: string): Observable<{blob: Blob, filename: string}> {
    const url = `${conf.url.api.shareFile}${id}/`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url, {
      responseType: ResponseContentType.Blob,
      headers: headers,
    }).map(response => {
      return {
        blob: new Blob([response.blob()], { type: 'application/octet-stream' }),
        filename: response.headers.get('filename'),
      };
    });
  }

  getShareFile(file: File): Observable<ShareFile|null> {
    const url = `${conf.url.api.fileLink}?file=${file.id}/`;
    return this.http.get(url)
      .map(res => res.json())
      .map(data => {
        if (data.results.length === 0) {
          return null;
        } else {
          return ShareFile.createFromJson(data.results[0]);
        }
      });
  }

  create(file: File): Observable<ShareFile> {
    const url = conf.url.api.fileLink;
    const body: any = {};
    body.file = file.url.toString();
    return this.http.post(url, body).map(res => ShareFile.createFromJson(res.json()));
  }

  remove(shareFile: ShareFile): Observable<null> {
    return this.http.delete(shareFile.url.toString());
  }
}
