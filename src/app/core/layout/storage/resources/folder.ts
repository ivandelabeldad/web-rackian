import { conf } from 'app/conf';

export class Folder {

  public id: string;
  public name: string;
  public description: string;
  public created_at: string;
  public updated_at: string;
  public parent_folder: URL;
  public mime_type = '';
  public size = '';
  public url: URL;

  public static createFromJson(json: any): Folder {
    const folder = new Folder();
    if (json.url) {
      folder.url = new URL(json.url);
    }
    folder.id = json.id || '';
    folder.name = json.name || '';
    folder.description = json.description || '';
    folder.created_at = json.created_at || null;
    folder.updated_at = json.updated_at || null;
    if (json.parent_folder instanceof String) {
      folder.parent_folder = new URL(json.parent_folder);
    } else {
      folder.parent_folder = json.parent_folder || null;
    }
    return folder;
  }

  static sortByName(a: Folder , b: Folder) {
    return a.name.localeCompare(b.name);
  }

  public static urlById(id: string) {
    return conf.url.api.folders + id + '/';
  }

  constructor() {
  }

}
