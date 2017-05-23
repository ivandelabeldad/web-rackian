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
    folder.id = json.id || null;
    folder.name = json.name || null;
    folder.description = json.description || null;
    folder.created_at = json.created_at || null;
    folder.updated_at = json.updated_at || null;
    if (json.parent_folder instanceof String) {
      folder.parent_folder = new URL(json.parent_folder);
    } else {
      folder.parent_folder = json.parent_folder || null;
    }
    return folder;
  }

  public static urlById(id: string) {
    return conf.url.api.folders + id + '/';
  }

  constructor() {
  }

}
