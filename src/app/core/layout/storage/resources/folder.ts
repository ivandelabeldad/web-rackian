import { conf } from 'app/conf';
import { ShareFolder } from '../share/share-folder';

export class Folder {

  public url: string;
  public id: string;
  public name: string;
  public description: string;
  public created_at: string;
  public updated_at: string;
  public parent_folder: string;
  public mime_type = '';
  public size = '';
  public link: string;
  public share: ShareFolder;

  public static createFromJson(json: any): Folder {
    const folder = new Folder();
    folder.url = json.url || '';
    folder.id = json.id || '';
    folder.name = json.name || '';
    folder.description = json.description || '';
    folder.created_at = json.created_at || null;
    folder.updated_at = json.updated_at || null;
    folder.parent_folder = json.parent_folder || '';
    folder.link = json.link || '';
    return folder;
  }

  static sortByName(a: Folder , b: Folder) {
    return a.name.localeCompare(b.name);
  }

  public static urlById(id: string): string {
    return conf.url.api.folders + id + '/';
  }

  constructor() {
    this.id = '';
  }

  getParentFolder() {
    return this.parent_folder;
  }

}
