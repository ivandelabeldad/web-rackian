import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { File } from '../core/layout/storage/resources/file';
import { Folder } from '../core/layout/storage/resources/folder';


@Pipe({
  name: 'fileIcon'
})
export class FileIconPipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer) {}

  transform(value: File | Folder, args?: any): any {
    if (value instanceof Folder) {
      return this.sanitized.bypassSecurityTrustHtml(IconTag.getTag('folder'));
    }
    let icon: Icon;
    if (value.mime_type.includes('image')) {
      icon = 'file-image';
    }
    if (value.mime_type.includes('xls')
      || value.mime_type.includes('excel')
      || value.extension.includes('xls')) {
      icon = 'file-excel';
    }
    if (value.mime_type.includes('application/pdf') || value.extension.includes('pdf')) {
      icon = 'file-pdf';
    }
    if (value.extension.includes('mp3')
      || value.extension.includes('wav')
      || value.mime_type.includes('audio')) {
      icon = 'file-music';
    }
    if (value.extension.includes('doc')
      || value.mime_type.includes('text')) {
      icon = 'file-document';
    }
    if (value.extension.includes('mp4')
      || value.mime_type.includes('video')) {
      icon = 'file-video';
    }
    if (value.mime_type.includes('text/folder')) {
      icon = 'folder';
    }
    if (value.mime_type.includes('compressed')) {
      icon = 'package';
    }
    if (!icon) {
      icon = 'file';
    }
    return this.sanitized.bypassSecurityTrustHtml(IconTag.getTag(icon));
  }

}

type Icon =
  'file-image' |
  'file' |
  'file-excel' |
  'file-pdf' |
  'file-music' |
  'file-document' |
  'file-video' |
  'package' |
  'folder';

class IconTag {

  static getTag(icon: Icon, color?) {
    if (!color) {
      color = IconTag.guessColor(icon);
    }
    return `<i class="mdi mdi-${icon}" style="color: ${color} !important;"></i>`;
  }

  static guessColor(icon: Icon) {
    if (icon === 'folder') {
      return '#757575';
    }
    if (icon === 'file-image') {
      return '#F57C00';
    }
    if (icon === 'file-pdf') {
      return '#D32F2F';
    }
    if (icon === 'file-excel') {
      return '#388E3C';
    }
    if (icon === 'file-music') {
      return '#FBC02D';
    }
    if (icon === 'file-document') {
      return '#0288D1';
    }
    if (icon === 'file-video') {
      return '#00796B';
    }
    if (icon === 'package') {
      return '#EC407A';
    }
    return '#0288D1';
  }

}
