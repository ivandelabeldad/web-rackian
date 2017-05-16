import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Folder } from './folder';
import { AuthHttpService } from '../../../../shared/authentication/auth-http.service';
import { conf } from '../../../../conf';


@Injectable()
export class FolderService {

  constructor(private http: AuthHttpService) { }

  getFolders(folder?: Folder, url?: string): Observable<Folder[]> {
    folder = folder || new Folder();
    url = url || conf.url.api.folders;
    const params = new URLSearchParams();
    params.set('folder', folder.id);
    return this.http.get(url, { search: params })
      .map(res => res.json())
      .mergeMap(data => {
        console.log(data);
        if (data.next) {
          return this.getFolders(folder, data.next)
            .map(resultsToJoin => [...data.results.map(e => Folder.createFromJson(e)), ...resultsToJoin]);
        } else {
          return Observable.of(data.results.map(e => Folder.createFromJson(e)));
        }
      });
  }

}
