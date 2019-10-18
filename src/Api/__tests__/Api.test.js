import { getLoginUrl } from '../Config';

describe('Api', () => {
  it('Skal gi tilbake riktig url T6 og T1', () => {
    const url = getLoginUrl('https://t6.no');
    expect(url).toEqual('https://loginservice.nav.no/login?level=Level3');
  });

  it('Skal gi tilbake riktig url Q', () => {
    const url = getLoginUrl('https://www-q.no');
    expect(url).toEqual('https://loginservice-q.nav.no/login?level=Level3');
  });
});
