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
        getBehov(localPayload)
          .then((response) => {
            const {minsteinntektResultat, periodeResultat, satsResultat} = response;
            setOppfyllerInntekstkrav(minsteinntektResultat.oppfyllerMinsteinntekt);
            setPeriodeAntallUker(periodeResultat.periodeAntallUker);
            setUkesats(satsResultat.ukesats);
          })
          .catch((error) => {
            throw new Error(`En feil har oppstått i forbindelse med tjenestekallet til backend. ${error}`);
          })
          .finally(setLoading(false));
        // FIXME: MOCK FOR NOW
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
      }
      else {
        verifyToken()
          .then((response) => {
            console.log(response)
            //response.status===401?redirectToLogin():setVerified(true)
          })
          .catch((error) => {
            throw new Error(`En feil har oppstått i forbindelse med tjenestekallet til backend. ${error}`);
          })
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
