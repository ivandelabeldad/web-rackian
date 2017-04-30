import { Injectable } from '@angular/core';
import { ConnectionBackend, Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { AuthenticatedUser } from './AuthenticatedUser';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticatedHttpService extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private authenticatedUser: AuthenticatedUser) {
    super(backend, defaultOptions);
  }

  private addToken(options?: RequestOptionsArgs) {
    if (options) {
      options.headers.append('Authorization', 'Token ' + this.authenticatedUser.getToken());
    }
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.addToken(options);
    return super.get(url, options);
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.addToken(options);
    return super.post(url, body, options);
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.addToken(options);
    return super.put(url, body, options);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.addToken(options);
    return super.delete(url, options);
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.addToken(options);
    return super.patch(url, body, options);
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.addToken(options);
    return super.head(url, options);
  }

  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.addToken(options);
    return super.options(url, options);
  }
}
