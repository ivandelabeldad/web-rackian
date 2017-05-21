import { Folder } from './folder';


export class File {

  public id: string;
  public name: string;
  public description: string;
  public size: string;
  public mime_type: string;
  public created_at: string;
  public updated_at: string;
  public parent_folder: Folder;
  public link: URL;

  public static createFromJson(json: any): File {
    const file = new File();
    file.id = json.id || null;
    file.name = json.name || null;
    file.description = json.description || null;
    file.size = json.size || null;
    file.mime_type = json.mime_type || null;
    file.created_at = json.created_at || null;
    file.updated_at = json.updated_at || null;
    file.parent_folder = json.parent_folder || null;
    file.link = json.link || null;
    return file;
  }

  constructor() {
  }

}
