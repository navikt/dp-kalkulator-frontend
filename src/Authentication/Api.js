import conf from './Config';

export const redirectToLogin = () => {
  window.location.assign(`${conf.LOGINSERVICE}&redirect=${window.location.href}`); // eslint-disable-line no-undef
};

export const checkAuth = () => {
  console.log(document.cookie);
};
