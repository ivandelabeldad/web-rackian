import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { conf } from '../../../../conf';
import { User } from '../../../../shared/authentication/user';
import { Token } from '../../../../shared/authentication/token';


@Injectable()
export class LoginService {

  constructor(private http: Http, private user: User) {
  }

  public login(username: string, password: string, remember: boolean): Observable<any> {
    const headersToken = new Headers();
    const headersUser = new Headers();
    headersToken.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    const optionsToken = new RequestOptions({ headers: headersToken });
    const optionsUser = new RequestOptions({ headers: headersUser });

    return this.http.get(conf.url.api.token, optionsToken)
      .map(res => res.json())
      .flatMap(data => {
        this.user.getToken().setFromJson(data);
        headersUser .append('Authorization', 'Token ' + data.key);
        return this.http.get(conf.url.api.user + data.user_id, optionsUser);
      })
      .map(res => {
        this.user.setFromJson(res.json());
        if (remember) {
          this.user.saveToLocalStorage();
          this.user.getToken().saveToLocalStorage();
        } else {
          this.user.saveToSessionStorage();
          this.user.getToken().saveToSessionStorage();
        }
        return this.user;
      }).catch(err => {
        return Observable.throw(err);
      });
  }

}
