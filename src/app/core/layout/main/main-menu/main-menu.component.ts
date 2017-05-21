import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/authentication/user';
import { RequestOptions, Headers } from '@angular/http';
import { AuthHttpService } from '../../../../shared/authentication/auth-http.service';
import { Observable } from 'rxjs/Observable';
import { conf } from '../../../../conf';

@Component({
  selector: 'rackian-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainBarComponent implements OnInit {

  user: User;

  constructor(private userService: User, private http: AuthHttpService) {
  }

  ngOnInit() {
    this.user = this.userService;
  }

  fileUpload(evt) {
    const fileList: FileList = evt.target.files;
    if (fileList.length <= 0) {
      return;
    }

    const file: File = fileList[0];
    const formData: FormData = new FormData();
    formData.append('link', file);
    formData.append('link', 'value of the property');
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    const options = new RequestOptions({ headers });
    this.http.post(`${conf.url.api.files}`, formData, options)
      .map(res => res.json())
      .catch(error => Observable.throw(error))
      .subscribe(
        data => console.log('success'),
        error => console.log(error)
      );
  }

}
