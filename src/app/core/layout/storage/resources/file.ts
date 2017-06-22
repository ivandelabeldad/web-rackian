import { ShareFile } from '../share/share-file';
export class File {

  public id: string;
  public url: string;
  public name: string;
  public description: string;
  public size: number;
  public mime_type: string;
  public created_at: string;
  public updated_at: string;
  public folder: string;
  public extension: string;
  public link: string;
  public share: ShareFile;

  public static createFromJson(json: any): File {
    const file = new File();
    file.url = json.url || '';
    file.id = json.id || '';
    file.name = json.name || '';
    file.description = json.description || '';
    file.size = json.size || null;
    file.mime_type = json.mime_type || '';
    file.created_at = json.created_at || null;
    file.updated_at = json.updated_at || null;
    file.folder = json.folder || null;
    file.link = json.link || '';
    file.extension = json.extension || '';
    return file;
  }

  static sortByName(a: File , b: File) {
    return a.name.localeCompare(b.name);
  }

  constructor() {
  }

  isRenderable() {
    return [
      // 'application/pdf',
      // 'image/png',
    ].indexOf(this.mime_type) !== -1;
  }

  getParentFolder() {
    return this.folder;
  }

  update(file: File) {
    this.id = file.id;
    this.url = file.url;
    this.name = file.name;
    this.description = file.description;
    this.size = file.size;
    this.mime_type = file.mime_type;
    this.created_at = file.created_at;
    this.updated_at = file.updated_at;
    this.folder = file.folder;
    this.extension = file.extension;
    this.link = file.link;
    this.share = file.share;
  }
}
