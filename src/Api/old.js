import conf from './Config';

require('dotenv').config();
const axios = require('axios');

const header = () => {
  return {
    headers: {
      'X-API-KEY': process.env.REACT_APP_TOKEN,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };
};

const get = async url => {
  const response = await axios.get(url, header());
  return response;
};

const post = async (url, params) => {
  const response = await axios.post(url, params, header());
  return response;
};

const getSubsumsjonsLocation = response => {
  return response.headers.location;
};

const startBehov = async params => {
  return post(process.env.REACT_APP_API_URL, params)
    .then(getSubsumsjonsLocation)
    .then(poll)
};

const redirectToLogin = () => {
  window.location.assign(`${conf.LOGINSERVICE}&redirect=${window.location.href}`); // eslint-disable-line no-undef
};

const verifyToken = async () => {
  return post(conf.REACT_APP_API_URL);
};

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

const delay = async msDelay => {
  return await new Promise(resolve => {
    setTimeout(async () => {
      resolve();
    }, msDelay);
  });
};

export default { startBehov, verifyToken, redirectToLogin };

import React, { useEffect, useState } from 'react';
import LoadingMessage from '../Components/LoadingMessage';
import { getBehov, verifyToken, redirectToLogin } from '../Api';
import QualifiedMessage from './QualifiedMessage';

const Kalkulator = () => {
  const [isLoading, setLoading] = useState(true);
  const [isOppfyllerInntekstkrav, setOppfyllerInntekstkrav] = useState(false);
  const [periodeAntallUker, setPeriodeAntallUker] = useState(0);
  const [ukesats, setUkesats] = useState(0);
  const [isVerified, setVerified] = useState(false);

  // todo fjerne rerender da dette fører til henting av data kontinuerlig
  // localpayload brukes kun i testing
  const localPayload = {
    beregningsdato: "2019-07-01",
  };
  const localparams = JSON.stringify(localPayload);

  useEffect(() => {
    const fetchData = async () => {
      if (isVerified) {
        try {
          // FIXME: MOCK FOR NOW
          const response = await getBehov(localPayload);

          /*
          const response = {
            minsteinntektResultat: {
              oppfyllerMinsteinntekt: true,
            },
            periodeResultat: {
              periodeAntallUker: 13,
            },
            satsResultat: {
              ukesats: 54000,
            },
          };
          */

          const { minsteinntektResultat, periodeResultat, satsResultat } = response;
          setOppfyllerInntekstkrav(minsteinntektResultat.oppfyllerMinsteinntekt);
          setPeriodeAntallUker(periodeResultat.periodeAntallUker);
          setUkesats(satsResultat.ukesats);
          setLoading(false);
        } catch (error) {
          throw new Error(`En feil har oppstått i forbindelse med tjenestekallet til backend. ${error}`);
        }
      } else {
        try {
          await verifyToken(localparams)
            .then((response)=>{
              console.log("response is: "+response);
              if(response.status===200){setVerified(true)}
            });
        } catch (error) {
          console.log(error);
          if(error.response.status===401){redirectToLogin()}
          setVerified(false);
          throw new Error(`En feil har oppstått i forbindelse med tjenestekallet til backend. ${error}`);
        }
      }
    };

    fetchData();
  }, [isVerified, localparams]);

  if (isLoading) {
    return <LoadingMessage type="XL" />;
  }
  return <QualifiedMessage isOppfyllerInntekstkrav={isOppfyllerInntekstkrav} ukesats={ukesats} periodeAntallUker={periodeAntallUker} />;
};

export default Kalkulator;

