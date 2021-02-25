import {getApiBaseUrl, getBaseUrl, getLoginUrl} from "./Config";
import {isDevelopment} from "../utils/environment";

const axios = require("axios");

export const instance = axios.create({
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const verifyToken = async () => {
  try {
    return await instance({
      method: "get",
      url: `${getApiBaseUrl()}/auth`,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// Sett denne til false for å ikke få mock-resultat i dev
const mock = isDevelopment();

export const getBehov = async () => {
  if (mock && process.env.NODE_ENV === "development") {
    return instance({
      method: "get",
      url: `${process.env.PUBLIC_URL}/__mocks__/mockInnsyn.json`,
    });
  }

  return instance({
    method: "get",
    url: `${getApiBaseUrl()}/behov?regelkontekst=veiledning`,
  });

};

export const redirectToLogin = () => {
  window.location.assign(`${getLoginUrl()}&redirect=${getBaseUrl()}?samtykke=true`); // eslint-disable-line no-undef
};

const api = {getBehov, verifyToken, redirectToLogin};
export default api;
