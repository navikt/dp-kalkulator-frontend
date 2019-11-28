import { getLoginUrl, getApiBaseUrl } from './Config';

const axios = require('axios');

export const instance = axios.create({
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const verifyToken = async () => {
  try {
    return await instance({
      method: 'get',
      url: `${getApiBaseUrl()}/auth`,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const getBehov = async () => {
  // 1. verify token

  try {
    return await instance({
      method: 'get',
      url: `${getApiBaseUrl()}/behov`,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const redirectToLogin = (redirectUrl = window.location.href) => {
  window.location.assign(`${getLoginUrl()}&redirect=${redirectUrl}?samtykke=true`); // eslint-disable-line no-undef
};

export default { getBehov, verifyToken, redirectToLogin };
