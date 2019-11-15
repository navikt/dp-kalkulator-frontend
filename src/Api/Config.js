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
  return 'https://loginservice.nav.no/login?level=Level4';
};

export const getApiBaseUrl = (host = window.location.hostname) => {
  if (host.includes('localhost')) {
    return 'http://localhost:8099/kalkulator-api/';
  }
  if (host.includes('t6') || host.includes('t1')) {
    return 'https://www.nav.no/arbeid/dagpenger/kalkulator-api/';
  }
  if (host.includes('www-q')) {
    return 'https://www-q0.nav.no/arbeid/dagpenger/kalkulator-api/';
  }
  return 'https://www.nav.no/arbeid/dagpenger/kalkulator-api/';
};

export default { getLoginUrl, getApiBaseUrl };
