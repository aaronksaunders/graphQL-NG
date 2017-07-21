import { GraphQLNGPage } from './app.po';

describe('graph-qlng App', () => {
  let page: GraphQLNGPage;

  beforeEach(() => {
    page = new GraphQLNGPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
