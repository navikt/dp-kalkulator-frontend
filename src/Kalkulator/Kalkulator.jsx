import React, { useEffect, useState } from 'react';
import LoadingMessage from '../Components/LoadingMessage';
import { getBehov, verifyToken, redirectToLogin } from '../Api';
import QualifiedMessage from './QualifiedMessage';

const Kalkulator = () => {
  const [isLoading, setLoading] = useState(true);
  const [isOppfyllerInntekstkrav, setOppfyllerInntekstkrav] = useState(false);
  const [periodeAntallUker, setPeriodeAntallUker] = useState(0);
  const [ukesats, setUkesats] = useState(0);

  // todo fjerne rerender da dette fører til henting av data kontinuerlig
  // todo: lag logikk for å opprette dagens dato
  // localpayload brukes kun i testing
  const localPayload = {
    beregningsdato: "2019-07-01",
  };
  const localparams = JSON.stringify(localPayload);

  useEffect(() => {
    const fetchData = async () => {
        try {
          await verifyToken();
          // FIXME: MOCK FOR NOW
          const { minsteinntektResultat, periodeResultat, satsResultat } = await getBehov(localPayload);
          setOppfyllerInntekstkrav(minsteinntektResultat.oppfyllerMinsteinntekt);
          setPeriodeAntallUker(periodeResultat.periodeAntallUker);
          setUkesats(satsResultat.ukesats);
          setLoading(false);
        } catch (error) {
          if(error.response.status===401){redirectToLogin()}
          throw new Error(`En feil har oppstått i forbindelse med tjenestekallet til backend. ${error}`);
        }
      };
    fetchData();
  }, [localparams]);
  if (isLoading) {
    return <LoadingMessage type="XL" />;
  }
  return <QualifiedMessage isOppfyllerInntekstkrav={isOppfyllerInntekstkrav} ukesats={ukesats} periodeAntallUker={periodeAntallUker} />;
};

export default Kalkulator;
