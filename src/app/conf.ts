export const conf = {
  url: {
    api: {
      base: '',
      user: '',
      token: '',
      files: '',
      folders: '',
    },
  },
};

conf.url.api.base = 'http://localhost:8000/v1/';
// conf.url.api.base = 'http://94.14.224.193:8000/v1/';
conf.url.api.user = conf.url.api.base + 'user/';
conf.url.api.token = conf.url.api.base + 'token/';
conf.url.api.files = conf.url.api.base + 'files/';
conf.url.api.folders = conf.url.api.base + 'folders/';
