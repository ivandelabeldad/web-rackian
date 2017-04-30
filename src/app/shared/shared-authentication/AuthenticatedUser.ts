import { User } from './User';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthenticatedUser {
  constructor(private user: User) {
    this.loadLocalStorage();
  }

  public getUser() {
    return this.user;
  }

  public isLogged(): boolean {
    return this.user.getId() !== undefined && this.user.getId() !== null;
  }

  public setFromJson(json) {
    this.user.setId(json.id);
    this.user.setUsername(json.username);
    this.user.setFirstName(json.first_name);
    this.user.setLastName(json.last_name);
    this.user.setEmail(json.email);
    this.user.setIsAdmin(json.is_superuser);
    this.user.setSpace(json.space);
    this.user.setLastLogin(json.last_login);
    this.user.setToken(json.token);
  }

  public clear() {
    this.user.setId(null);
    this.user.setUsername(null);
    this.user.setFirstName(null);
    this.user.setLastName(null);
    this.user.setEmail(null);
    this.user.setIsAdmin(null);
    this.user.setSpace(null);
    this.user.setLastLogin(null);
    this.user.setToken(null);
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
  }

  public getToken() {
    return this.user.getToken();
  }

  private loadLocalStorage() {
    if (!this.isLogged()) {
      if (localStorage.getItem('user')) {
        this.setFromJson(JSON.parse(localStorage.getItem('user')));
        return;
      }
      if (sessionStorage.getItem('user')) {
        this.setFromJson(JSON.parse(sessionStorage.getItem('user')));
        return;
      }
    }
  }
}
