import { GraphQlngPage } from './app.po';

describe('graph-qlng App', function() {
  let page: GraphQlngPage;

  beforeEach(() => {
    page = new GraphQlngPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
