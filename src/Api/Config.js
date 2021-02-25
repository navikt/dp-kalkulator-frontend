export const getLoginUrl = (host = window.location.hostname) => {
  if (host.includes("localhost")) {
    return "http://localhost:9111/login?level=Level3";
  }
  if (host.includes("t6") || host.includes("t1")) {
    return "https://loginservice.nav.no/login?level=Level3";
  }
  if (host.includes("www-q")) {
    return "https://loginservice-q.nav.no/login?level=Level3";
  }
  if (host.includes("arbeid.dev")) {
    return "https://loginservice.dev.nav.no/login?level=Level3";
  }
  return "https://loginservice.nav.no/login?level=Level3";
};

export const getBaseUrl = (host = window.location.hostname) => {
  if (host.includes("localhost") || host.includes("t6") || host.includes("t1") || host.includes("www-q") || host.includes("arbeid.dev")) {
    return window.location.href;
  }
  return "https://www.nav.no/arbeid/dagpenger/kalkulator";
};

export const getApiBaseUrl = (host = window.location.hostname) => {
  if (host.includes("localhost")) {
    return "http://localhost:8099/api/kalkulator";
  }
  if (host.includes("t6") || host.includes("t1")) {
    return "https://www.nav.no/arbeid/dagpenger/api/kalkulator";
  }
  if (host.includes("www-q")) {
    return "https://www-q0.nav.no/arbeid/dagpenger/api/kalkulator";
  }
  if (host.includes("arbeid.dev")) {
    return "https://arbeid.dev.nav.no/arbeid/dagpenger/api/kalkulator";
  }
  return "https://www.nav.no/arbeid/dagpenger/api/kalkulator";
};

const config = { getLoginUrl, getApiBaseUrl };
export default config;
