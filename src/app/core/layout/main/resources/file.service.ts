import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Folder } from './folder';
import { AuthHttpService } from '../../../../shared/authentication/auth-http.service';
import { conf } from '../../../../conf';
import { File } from './file';


@Injectable()
export class FileService {

  constructor(private http: AuthHttpService) { }

  getFiles(folder?: Folder): Observable<File[]> {
    if (!folder) {
      folder = new Folder();
    }
    const params = new URLSearchParams();
    params.set('folder', folder.id);
    return this.http.get(conf.url.api.files, { search: params })
      .map(res => {
        console.log(res.json());
        return res.json().results.map(jsonFile => File.createFromJson(jsonFile));
      });
  }

}
