import { LilyPage } from './app.po';

describe('lily App', () => {
  let page: LilyPage;

  beforeEach(() => {
    page = new LilyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
