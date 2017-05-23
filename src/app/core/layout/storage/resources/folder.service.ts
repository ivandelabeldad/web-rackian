import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Folder } from './folder';
import { File } from './file';
import { AuthHttpService } from '../../../../shared/authentication/auth-http.service';
import { conf } from '../../../../conf';


@Injectable()
export class FolderService {

  constructor(private http: AuthHttpService) { }

  getFolders(folder?: Folder, url?: string): Observable<Folder[]> {
    folder = folder || new Folder();
    if (!folder.id) folder.id = '';
    url = url || conf.url.api.folders + '?parent_folder=' + folder.id;
    return this.http.get(url)
      .map(res => res.json())
      .mergeMap(data => {
        if (data.next) {
          return this.getFolders(folder, data.next)
            .map(resultsToJoin => [...data.results.map(e => Folder.createFromJson(e)), ...resultsToJoin]);
        } else {
          return Observable.of(data.results.map(e => Folder.createFromJson(e)));
        }
      });
  }

  getParentFolder(resource: File|Folder): Observable<Folder> {
    const url = conf.url.api.folders + '/' + resource.id;
    return this.http.get(url).map(res => res.json()).map(data => Folder.createFromJson(data));
  }

  getParentFolders(resource: File|Folder, result?: Folder[], nextUrl?: string): Observable<Folder[]> {
    const url = nextUrl || conf.url.api.folders + '/' + resource.id;
    if (!result) result = [];
    return this.http.get(url)
      .map(res => res.json())
      .mergeMap(data => {
        const folder = Folder.createFromJson(data);
        result.push(folder);
        if (data.parent_folder == null) {
          return Observable.of(result.reverse());
        } else {
          return this.getParentFolders(folder, result, folder.parent_folder);
        }
      });
  }

}
