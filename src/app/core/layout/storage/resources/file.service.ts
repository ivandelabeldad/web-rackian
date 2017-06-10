import { Injectable } from '@angular/core';
import { ResponseContentType, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Folder } from './folder';
import { AuthHttpService } from '../../../../shared/authentication/auth-http.service';
import { conf } from '../../../../conf';
import { File } from './file';
import { User } from '../../../../shared/authentication/user';


@Injectable()
export class FileService {

  constructor(private http: AuthHttpService, private user: User) { }

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
      console.log(response);
      return File.createFromJson(response.json());
    });
  }

}
