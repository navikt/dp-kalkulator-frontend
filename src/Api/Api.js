import conf from './Config';

require('dotenv').config();
const axios = require('axios');

// TODO async await es6

const header = () => ({
  headers: {
    'X-API-KEY': process.env.REACT_APP_TOKEN,
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const get = async url => {
  const response = await axios.get(url, header());
  return response;
};

const post = async (url, params) => {
  const response = await axios.post(url, params, header());
  return response;
};

const delay = async msDelay =>
  new Promise(resolve => {
    setTimeout(async () => {
      resolve();
    }, msDelay);
  });

const poll = async (url, retries = 3, msDelay = 1000) => {
  const response = await get(url);

  if (response.data.status) {
    if (retries > 0) {
      await delay(msDelay);
      return poll(url, retries - 1, msDelay);
    }
    throw new Error('Polling timed out');
  }

  return response.data;
};

const getSubsumsjonsLocation = response => response.headers.location;

const startBehov = async params =>
  post(process.env.REACT_APP_API_URL, params)
    .then(getSubsumsjonsLocation)
    .then(poll);

const redirectToLogin = () => {
  window.location.assign(`${conf.LOGINSERVICE}&redirect=${window.location.href}`); // eslint-disable-line no-undef
};

const verifyToken = async () => post(conf.REACT_APP_API_URL);

export default { startBehov, verifyToken, redirectToLogin };
