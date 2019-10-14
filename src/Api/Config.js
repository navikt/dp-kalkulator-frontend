export const getLoginUrl = (host = window.location.hostname) => {
  if (host.includes('localhost')) {
    return 'http://localhost:9111/login?level=Level3';
  }
  if (host.includes('t6') || host.includes('t1')) {
    return 'https://loginservice.nav.no/login?level=Level3';
  }
  if (host.includes('www-q')) {
    return 'https://loginservice-q.nav.no/login?level=Level3';
  }
  return 'https://loginservice.nav.no/login?level=Level3';
};

export default {
  LOGINSERVICE: getLoginUrl(),
};
