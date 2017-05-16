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
    url = url || conf.url.api.files;
    const params = new URLSearchParams();
    params.set('folder', folder.id);
    return this.http.get(url, { search: params })
      .map(res => res.json())
      .mergeMap(data => {
        console.log(data);
        if (data.next) {
          return this.getFiles(folder, data.next)
            .map(resultsToJoin => [...data.results.map(e => File.createFromJson(e)), ...resultsToJoin]);
        } else {
          return Observable.of(data.results.map(e => File.createFromJson(e)));
        }
      });
  }

}
