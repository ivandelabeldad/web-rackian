import { Injectable } from '@angular/core';
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
    if (!folder.id) folder.id = '';
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

}
