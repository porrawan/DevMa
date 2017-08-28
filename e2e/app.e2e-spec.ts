import { DevmaPage } from './app.po';

describe('devma App', () => {
  let page: DevmaPage;

  beforeEach(() => {
    page = new DevmaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
