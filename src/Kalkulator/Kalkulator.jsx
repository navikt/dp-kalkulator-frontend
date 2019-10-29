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
              response.status===200?setVerified(true):redirectToLogin()
            });
        } catch (error) {
          console.log(error);
          setVerified(false); // TODO: DELETE BEFORE DEPLOYMENT
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
