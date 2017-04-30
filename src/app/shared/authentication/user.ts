import { Injectable } from '@angular/core';
import { Token } from './token';


@Injectable()
export class User {

  private storageKey = 'user';
  private id: string;
  private username: string;
  private email: string;
  private firstName: string;
  private lastName: string;
  private isAdmin: boolean;
  private lastLogin: Date;
  private space: number;

  constructor(private token: Token) {
    this.loadFromStorage();
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
  }

  public isLogged(): boolean {
    return this.getId() !== undefined && this.getId() !== null;
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

  public saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this));
  }

  public saveToSessionStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this));
  }

  private loadFromStorage() {
    if (!this.isLogged()) {
      if (localStorage.getItem(this.storageKey)) {
        this.setFromJson(JSON.parse(localStorage.getItem(this.storageKey)));
        return;
      }
      if (sessionStorage.getItem(this.storageKey)) {
        this.setFromJson(JSON.parse(sessionStorage.getItem(this.storageKey)));
        return;
      }
    }
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
    localStorage.removeItem(this.storageKey);
    sessionStorage.removeItem(this.storageKey);
  }

}
