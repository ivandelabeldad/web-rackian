import { Injectable } from '@angular/core';
import { Token } from './token';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { conf } from '../../conf';


@Injectable()
export class User {

  private spaceObservable = new Subject();

  private id: string;
  private username: string;
  private email: string;
  private firstName: string;
  private lastName: string;
  private isAdmin: boolean;
  private lastLogin: Date;
  private space: number;

  constructor(private token: Token, private http: Http) {
    if (token.getUserId()) {
      this.initUser();
    }
  }

  initUser() {
    const headersUser = new Headers();
    const optionsUser = new RequestOptions({ headers: headersUser });

    headersUser .append('Authorization', 'Token ' + this.token.getKey());
    this.http.get(conf.url.api.user + this.token.getUserId(), optionsUser)
      .map(res => {
        this.setFromJson(res.json());
      }).catch(err => {
      return Observable.throw(err);
    }).subscribe();
  }

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }

  getUsername(): string {
    return this.username;
  }

  setUsername(username: string): void {
    this.username = username;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getFirstName(): string {
    return this.firstName;
  }

  setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  getToken(): Token {
    return this.token;
  }

  getIsAdmin(): boolean {
    return this.isAdmin;
  }

  setIsAdmin(isAdmin: boolean): void {
    this.isAdmin = isAdmin;
  }

  getLastLogin(): Date {
    return this.lastLogin;
  }

  setLastLogin(lastLogin: Date): void {
    this.lastLogin = lastLogin;
  }

  getSpace(): number {
    return this.space;
  }

  setSpace(space: number): void {
    this.space = space;
    this.spaceObservable.next(this.space);
  }

  getSpaceAvailable(): number {
    return conf.space - this.getSpace();
  }

  getSpaceTotal(): number {
    return conf.space;
  }

  getSpaceObservable(): Observable<any> {
    return this.spaceObservable;
  }

  public isLogged(): boolean {
    if (!this.token) {
      return false;
    }
    return this.token.getUserId() !== undefined && this.token.getUserId() !== null;
  }

  public setFromJson(json) {
    this.setId(json.id);
    this.setUsername(json.username);
    this.setFirstName(json.first_name || json.firstName);
    this.setLastName(json.last_name || json.lastName);
    this.setEmail(json.email);
    this.setIsAdmin(json.is_superuser || json.isAdmin);
    this.setSpace(json.space);
    let date = json.last_login || json.lastLogin;
    date = new Date(date);
    this.setLastLogin(date);
  }

  public clear() {
    this.setId(null);
    this.setUsername(null);
    this.setFirstName(null);
    this.setLastName(null);
    this.setEmail(null);
    this.setIsAdmin(null);
    this.setSpace(null);
    this.setLastLogin(null);
  }

}
