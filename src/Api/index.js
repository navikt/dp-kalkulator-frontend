import { getLoginUrl, getApiBaseUrl } from './Config';

const axios = require('axios');

const instance = axios.create({
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});



// FIXME hvorfor der dette en post? Fordi den sender med dato for beregning
export const getBehov = async () => {
  try {
    const startBehovsLocation = await instance({
      method: 'get',
      url: `${getApiBaseUrl()}behov`,
    });
    return startBehovsLocation.data
  } catch (error) {
    return error;
  }
};

export const verifyToken = async () =>
  instance({
    method: 'get',
    url: `${getApiBaseUrl()}auth`,
  });


export const redirectToLogin = () => {
  window.location.assign(`${getLoginUrl()}&redirect=${window.location.href}`); // eslint-disable-line no-undef
};

export default { getBehov, verifyToken, redirectToLogin };
