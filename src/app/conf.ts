export const conf = {
  url: {
    api: {
      base: '',
      user: '',
      token: '',
      files: '',
      folders: '',
      downloads: '',
      fileLink: '',
      folderLink: '',
      shareFile: '',
      shareFolder: '',
    },
    register: {
      base: '',
    }
  },
  // 100 MB
  space: 104857600,
};

conf.url.api.base = 'http://localhost:8000/v1/';
// conf.url.api.base = 'https://api.rackian.com/v1/';
conf.url.api.user = conf.url.api.base + 'user/';
conf.url.api.token = conf.url.api.base + 'token/';
conf.url.api.files = conf.url.api.base + 'files/';
conf.url.api.downloads = conf.url.api.base + 'download/';
conf.url.api.folders = conf.url.api.base + 'folders/';
conf.url.register.base = 'https://register.rackian.com/';
conf.url.api.fileLink = conf.url.api.base + 'filelink/';
conf.url.api.folderLink = conf.url.api.base + 'folderlink/';
conf.url.api.shareFile = conf.url.api.base + 'share/file/';
conf.url.api.shareFolder = conf.url.api.base + 'share/folder/';
