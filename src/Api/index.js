import { getLoginUrl, getApiBaseUrl } from './Config';

const axios = require('axios');

const instance = axios.create({
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const getSubsumsjonsLocation = response => {
  return response.headers.location;
};

const delay = async msDelay => {
  return new Promise(resolve => {
    setTimeout(async () => {
      resolve();
    }, msDelay);
  });
};

// todo: need to rework the if-clause when response.data.status is not see other? might be handled by reject
const poll = async (uri, retries = 3, msDelay = 1000) => {
  const response = await instance({
    method: 'get',
    url: uri,
  });
  if (response.data.status) {
    if (retries > 0) {
      await delay(msDelay);
      return poll(uri, retries - 1, msDelay);
    }
    throw new Error('Polling timed out');
  }

  return response.data;
};

// FIXME hvorfor der dette en post? Fordi den sender med dato for beregning
export const getBehov = async () => {
  try {
    const startBehovsLocation = await instance({
      method: 'get',
      url: `${getApiBaseUrl()}behov`,
    });
    return await poll(getSubsumsjonsLocation(startBehovsLocation));
  } catch (error) {
    return error;
  }
};

export const verifyToken = async () =>
  instance({
    method: 'get',
    url: `${getApiBaseUrl()}auth`,
  });

// const getSubsumsjonsLocation = response => response.headers.location;

export const redirectToLogin = () => {
  window.location.assign(`${getLoginUrl()}&redirect=${window.location.href}`); // eslint-disable-line no-undef
};

export default { getBehov, verifyToken, redirectToLogin };
