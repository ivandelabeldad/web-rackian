import { Injectable } from '@angular/core';


@Injectable()
export class User {
  private id: string;
  private username: string;
  private firstName: string;
  private lastName: string;
  private token: string;
  private isAdmin: boolean;
  private lastLogin: Date;
  private space: number;

  constructor() {
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

  getToken(): string {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
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
}
