import React, { useEffect, useState } from 'react';
import LoadingMessage from '../Components/LoadingMessage';
import { getBehov, verifyToken, redirectToLogin } from '../Api';
import QualifiedMessage from './QualifiedMessage';

const Kalkulator = () => {
  const [isLoading, setLoading] = useState(true);
  const [isOppfyllerInntekstkrav, setOppfyllerInntekstkrav] = useState(false);
  const [periodeAntallUker, setPeriodeAntallUker] = useState(0);
  const [ukesats, setUkesats] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
        try {
          await verifyToken();
          let result = await getBehov();
          const { oppfyllerMinsteinntekt, periodeAntallUker, ukesats } = result;
          setOppfyllerInntekstkrav(oppfyllerMinsteinntekt);
          setPeriodeAntallUker(periodeAntallUker);
          setUkesats(ukesats);
          console.log("result: "+result)
          console.log('inntekt: ' +$oppfyllerMinsteinntekt+'uker: '+periodeAntallUker+'sats: '+ukesats)
          setLoading(false);
        } catch (error) {
          if(error.response.status===401){redirectToLogin()}
          throw new Error(`En feil har oppstått i forbindelse med tjenestekallet til backend. ${error}`);
        }
      };
    fetchData();
  }, []);
  if (isLoading) {
    return <LoadingMessage type="XL" />;
  }
  return <QualifiedMessage isOppfyllerInntekstkrav={isOppfyllerInntekstkrav} ukesats={ukesats} periodeAntallUker={periodeAntallUker} />;
};

export default Kalkulator;
