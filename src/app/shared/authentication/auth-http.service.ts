import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from './user';
import { Token } from './token';


@Injectable()
export class AuthHttpService {

  constructor(private http: Http, private user: User, private token: Token, private router: Router) { }

  private addToken(options: RequestOptionsArgs) {
    if (!this.user.isLogged()) {
      return;
    }
    if (options.headers) {
      options.headers.append('Authorization', 'Token ' + this.token.getKey());
    } else {
      const headers = new Headers();
      headers.append('Authorization', 'Token ' + this.token.getKey());
      options.headers = headers;
    }
  }

  private logoutIfExpired() {
    if (!this.user.isLogged()) {
      return;
    }
    if (this.token.hasExpired()) {
      this.router.navigate(['/logout']);
    }
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = options || new RequestOptions();
    this.logoutIfExpired();
    this.addToken(options);
    return this.http.get(url, options);
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = options || new RequestOptions();
    this.logoutIfExpired();
    this.addToken(options);
    return this.http.post(url, body, options);
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = options || new RequestOptions();
    this.logoutIfExpired();
    this.addToken(options);
    return this.http.put(url, body, options);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = options || new RequestOptions();
    this.logoutIfExpired();
    this.addToken(options);
    return this.http.delete(url, options);
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = options || new RequestOptions();
    this.logoutIfExpired();
    this.addToken(options);
    return this.http.patch(url, body, options);
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = options || new RequestOptions();
    this.logoutIfExpired();
    this.addToken(options);
    return this.http.head(url, options);
  }

  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = options || new RequestOptions();
    this.logoutIfExpired();
    this.addToken(options);
    return this.http.options(url, options);
  }

}
