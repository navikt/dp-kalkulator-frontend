import React, { useEffect, useState } from 'react';
import LoadingMessage from '../Components/LoadingMessage';
import { getBehov, verifyToken, redirectToLogin } from '../Api';
import QualifiedMessage from './QualifiedMessage';

const Kalkulator = () => {
  const [isLoading, setLoading] = useState(true);
  const [isOppfyllerInntekstkrav, setOppfyllerInntekstkrav] = useState(false);
  const [periodeAntallUker, setPeriodeAntallUker] = useState(0);
  const [ukesats, setUkesats] = useState(0);
  const [isVerified, setVerified] = useState(true);

  // todo fjerne rerender da dette fører til henting av data kontinuerlig
  const localPayload = {
    aktorId: process.env.APP_aktorId,
    vedtakId: process.env.APP_vedtakId,
    beregningsdato: process.env.APP_beregningsdato,
  };
  const localparams = JSON.stringify(localPayload);

  useEffect(() => {
    const fetchData = async () => {
      if (isVerified) {
        try {
          // FIXME: MOCK FOR NOW
          const response = await getBehov(localparams);

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
          await verifyToken(localparams);
          await setVerified(true);
        } catch (error) {
          setVerified(true); // TODO: DELETE BEFORE DEPLOYMENT
          redirectToLogin();
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
