import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Folder } from './folder';
import { AuthHttpService } from '../../../../shared/authentication/auth-http.service';
import { conf } from '../../../../conf';


@Injectable()
export class FolderService {

  constructor(private http: AuthHttpService) { }

  getFolders(folder?: Folder): Observable<Folder[]> {
    if (!folder) {
      folder = new Folder();
    }
    const params = new URLSearchParams();
    params.set('folder', folder.id);
    return this.http.get(conf.url.api.folders, { search: params })
      .map(res => {
        console.log(res.json());
        return res.json().results.map(jsonFile => Folder.createFromJson(jsonFile));
      });
  }

}
