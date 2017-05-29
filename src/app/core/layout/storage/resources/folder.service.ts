import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ResponseContentType, Headers } from '@angular/http';

import { Folder } from './folder';
import { File } from './file';
import { AuthHttpService } from '../../../../shared/authentication/auth-http.service';
import { conf } from '../../../../conf';


@Injectable()
export class FolderService {

  constructor(private http: AuthHttpService) { }

  getFolders(folder?: Folder, url?: string): Observable<Folder[]> {
    folder = folder || new Folder();
    if (!folder.id) {
      folder.id = '';
    }
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
    let url = '';
    url += resource.getParentFolder().toString();
    return this.http.get(url).map(res => res.json()).map(data => Folder.createFromJson(data));
  }

  getParentFolders(resource: File|Folder, result?: Folder[], nextUrl?: string): Observable<Folder[]> {
    let url = nextUrl || '';
    if (!url) {
      if (resource instanceof File) {
        url += conf.url.api.files;
      }
      if (resource instanceof Folder) {
        url += conf.url.api.folders;
      }
      url += resource.id;
    }
    if (!result) {
      result = [];
    }
    return this.http.get(url)
      .map(res => res.json())
      .mergeMap(data => {
        const folder = Folder.createFromJson(data);
        result.push(folder);
        if (data.parent_folder == null) {
          return Observable.of(result.reverse());
        } else {
          return this.getParentFolders(folder, result, folder.parent_folder.toString());
        }
      });
  }

  create(folder: Folder): Observable<Folder> {
    const url = conf.url.api.folders;
    const body: any = {};
    body.name = folder.name;
    if (folder.description) {
      body.description = folder.description;
    }
    if (folder.parent_folder) {
      body.parent_folder = folder.parent_folder.toString();
    }
    return this.http.post(url, body).map(res => Folder.createFromJson(res.json()));
  }

  getFolderData(folder: Folder): Observable<Blob> {
    const url = `${conf.url.api.downloads}${folder.id}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url, {
      responseType: ResponseContentType.Blob,
      headers: headers,
    }).map(data => new Blob([data.blob()], { type: 'application/octet-stream' }));
  }

  remove(folder: Folder): Observable<null> {
    return this.http.delete(folder.url.toString());
  }

  update(folder: Folder): Observable<Folder> {
    return this.http.patch(folder.url.toString(), folder).map(response => Folder.createFromJson(response.json()));
  }

}
