import { Injectable } from '@angular/core';
import { ResponseContentType, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Folder } from './folder';
import { AuthHttpService } from '../../../../shared/authentication/auth-http.service';
import { conf } from '../../../../conf';
import { File } from './file';


@Injectable()
export class FileService {

  constructor(private http: AuthHttpService) { }

  getFiles(folder?: Folder, url?: string): Observable<File[]> {
    folder = folder || new Folder();
    if (!folder.id) {
      folder.id = '';
    }
    url = url || conf.url.api.files + '?folder=' + folder.id;
    return this.http.get(url)
      .map(res => res.json())
      .mergeMap(data => {
        if (data.next) {
          return this.getFiles(folder, data.next)
            .map(resultsToJoin => [...data.results.map(e => File.createFromJson(e)), ...resultsToJoin]);
        } else {
          return Observable.of(data.results.map(e => File.createFromJson(e)));
        }
      });
  }

  getFileData(file: File): Observable<Blob> {
    const url = `${conf.url.api.downloads}${file.id}`;
    console.log(url);
    const headers = new Headers();
    headers.append('Content-Type', file.mime_type);
    return this.http.get(url, {
      responseType: ResponseContentType.Blob,
      headers: headers,
    }).map(data => new Blob([data.blob()], { type: file.mime_type }));
  }

  remove(file: File): Observable<null> {
    return this.http.delete(file.url.toString());
  }

  update(file: File): Observable<File> {
    return this.http.patch(file.url.toString(), file).map(response => File.createFromJson(response.json()));
  }

}
