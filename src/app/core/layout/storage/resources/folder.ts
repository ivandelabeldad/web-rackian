export class Folder {

  public id: string;
  public name: string;
  public description: string;
  public created_at: string;
  public updated_at: string;
  public parent_folder: Folder;
  public mime_type = '';
  public size = '';

  public static createFromJson(json: any): Folder {
    const folder = new Folder();
    folder.id = json.id || null;
    folder.name = json.name || null;
    folder.description = json.description || null;
    folder.created_at = json.created_at || null;
    folder.updated_at = json.updated_at || null;
    folder.parent_folder = json.parent_folder || null;
    return folder;
  }

  constructor() {
  }

}
