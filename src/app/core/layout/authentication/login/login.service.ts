import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { conf } from '../../../../conf';
import { AuthenticatedUser } from '../../../../shared/shared-authentication/AuthenticatedUser';


@Injectable()
export class LoginService {

  constructor(private http: Http, private authenticatedUser: AuthenticatedUser) {
  }

  public login(username: string, password: string, remember: boolean): Observable<any> {
    const headersToken = new Headers();
    const headersUser = new Headers();
    headersToken.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    const optionsToken = new RequestOptions({ headers: headersToken });
    const optionsUser = new RequestOptions({ headers: headersUser });
    let token;

    return this.http.get(conf.url.api.token, optionsToken)
      .map(res => res.json())
      .flatMap(data => {
        token = data.key;
        headersUser .append('Authorization', 'Token ' + data.key);
        return this.http.get(conf.url.api.user, optionsUser);
      })
      .map(res => {
        this.authenticatedUser.setFromJson(res.json());
        this.authenticatedUser.getUser().setToken(token);
        const item = {
          key: 'user',
          value: JSON.stringify(this.authenticatedUser.getUser()),
        };
        if (remember) {
          localStorage.setItem(item.key, item.value);
        } else {
          sessionStorage.setItem(item.key, item.value);
        }
        return this.authenticatedUser;
      }).catch(err => {
        return Observable.throw(err);
      });
  }

}
