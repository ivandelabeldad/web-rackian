import { conf } from '../../../../conf';
export class ShareFile {

  public url: URL;
  public file: string;
  public link: string;

  static createFromJson(json) {
    const shareFile = new ShareFile();
    shareFile.file = json.file;
    shareFile.link = json.link;
    shareFile.url = new URL(json.url);
    return shareFile;
  }

  constructor() {}

  getRealLink(): string {
    return this.link.replace(conf.url.api.base, conf.url.web.base);
  }

}
