import { WebRackianPage } from './app.po';

describe('web-rackian App', () => {
  let page: WebRackianPage;

  beforeEach(() => {
    page = new WebRackianPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
