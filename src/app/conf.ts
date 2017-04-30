export const conf = {
  url: {
    api: new function() {
      this.base = 'http://localhost:8000/v1/';
      this.user = this.base + 'user/';
      this.token = this.base + 'token/';
    }
  },
};
