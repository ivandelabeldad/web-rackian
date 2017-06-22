import { conf } from '../../../../conf';
export class ShareFolder {

  public folder: string;
  public link: string;

  static createFromJson(json) {
    const shareFolder = new ShareFolder();
    shareFolder.folder = json.folder;
    shareFolder.link = json.link;
    return shareFolder;
  }

  constructor() {}

  getRealLink() {
    return this.link.replace(conf.url.api.base, conf.url.web.base);
  }

}
