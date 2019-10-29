import { getLoginUrl, getApiBaseUrl } from './Config';

const axios = require('axios');

const instance = axios.create({
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// FIXME hvorfor der dette en post?
export const getBehov = async data => {
  try {
    return await instance({
      method: 'post',
      url: `${getApiBaseUrl()}behov`,
      data,
    });
  } catch (error) {
    return error;
  }
};

export const verifyToken = async () => {
  try {
    return await instance({
      method: 'get',
      url: `${getApiBaseUrl()}auth`,
    });
  } catch (error) {
    return error;
  }
};

// const getSubsumsjonsLocation = response => response.headers.location;

export const redirectToLogin = () => {
  window.location.assign(`${getLoginUrl}&redirect=${window.location.href}`); // eslint-disable-line no-undef
};

export default { getBehov, verifyToken, redirectToLogin };
