import { User } from './User';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthenticatedUser {
  private user: User;

  constructor() {}

  set(user): void {
    this.user = user;
  }

  get(): User {
    return this.user;
  }

  exists(): boolean {
    if (this.user) {
      return true;
    } else {
      return false;
    }
  }
}
