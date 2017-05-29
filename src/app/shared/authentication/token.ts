import { Injectable } from '@angular/core';

@Injectable()
export class Token {

  private storageKey = 'token';
  private key;
  private created;
  private expires;

  constructor() {
    this.loadFromStorage();
  }

  getKey(): string {
    return this.key;
  }

  setKey(key: string): void {
    this.key = key;
  }

  getCreated(): Date {
    return this.expires;
  }

  setCreated(created: Date) {
    this.created = created;
  }

  getExpires(): Date {
    return this.expires;
  }

  setExpires(expires: Date) {
    this.expires = expires;
  }

  public setFromJson(json) {
    this.setKey(json.key);
    this.setCreated(new Date(json.created));
    this.setExpires(new Date(json.expires));
  }

  public saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this));
  }

  public saveToSessionStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this));
  }

  private loadFromStorage() {
    if (localStorage.getItem(this.storageKey)) {
      this.setFromJson(JSON.parse(localStorage.getItem(this.storageKey)));
      return;
    }
    if (sessionStorage.getItem(this.storageKey)) {
      this.setFromJson(JSON.parse(sessionStorage.getItem(this.storageKey)));
      return;
    }
  }

  public clear() {
    this.setKey(null);
    this.setCreated(null);
    this.setExpires(null);
    localStorage.removeItem(this.storageKey);
    sessionStorage.removeItem(this.storageKey);
  }

  public hasExpired() {
    return this.expires.getTime() - new Date().getTime() <= 0;
  }

}
