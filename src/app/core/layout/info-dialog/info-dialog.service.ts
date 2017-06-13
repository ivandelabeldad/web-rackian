import { Injectable } from '@angular/core';
import { Folder } from '../storage/resources/folder';
import { File } from '../storage/resources/file';
import { DialogStatus } from './dialog-status';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';


@Injectable()
export class InfoDialogService {

  private resource: File | Folder;
  private title: string;
  private message: string;
  private status: DialogStatus;
  private show: boolean;
  private subject: Subject<any>;

  constructor() {
    this.subject = new Subject();
  }

  init(title: string, messageOrResource: File | Folder | string) {
    this.show = true;
    this.status = 'loading';
    this.title = title;
    if (messageOrResource instanceof File || messageOrResource instanceof Folder) {
      this.message = '';
      this.resource = messageOrResource;
    } else {
      this.message = messageOrResource;
      this.resource = null;
    }
    this.subject.next();
  }

  finish(title: string, message: string) {
    this.show = true;
    this.title = title;
    this.message = message;
    this.resource = null;
    this.status = 'success';
    this.subject.next();
  }

  finishWithErrors(title: string, message: string) {
    this.show = true;
    this.title = title;
    this.message = message;
    this.resource = null;
    this.status = 'error';
    this.subject.next();
  }

  subscribe(evt): Subscription {
    return this.subject.subscribe(() => evt());
  }

  getResource() {
    return this.resource;
  }

  getTitle() {
    return this.title;
  }

  getMessage() {
    return this.message;
  }

  getStatus() {
    return this.status;
  }

  getShow() {
    return this.show;
  }

}
