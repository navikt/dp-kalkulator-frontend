import React, { useEffect, useState } from 'react';
import LoadingMessage from '../Components/LoadingMessage';
import { getBehov } from '../Api';
import QualifiedMessage from './QualifiedMessage';
import tracking from '../lib/tracking';

const Kalkulator = () => {
  const [isLoading, setLoading] = useState(true);
  const [isOppfyllerInntekstkrav, setOppfyllerInntekstkrav] = useState(false);
  const [periodeAntallUker, setPeriodeAntallUker] = useState(0);
  const [ukesats, setUkesats] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data = {} } = await getBehov();
        if (data) {
          const { oppfyllerMinsteinntekt, periodeAntallUker: uker, ukesats: sats } = data;
          setOppfyllerInntekstkrav(oppfyllerMinsteinntekt);
          setPeriodeAntallUker(uker);
          setUkesats(sats);
          setLoading(false);
          tracking.logEvent('RESULTAT', {
            isOppfyllerInntekstkrav,
          });
        }
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchData();
  }, [isOppfyllerInntekstkrav]);

  if (isLoading) {
    return <LoadingMessage type="XL" />;
  }

  return <QualifiedMessage isOppfyllerInntekstkrav={isOppfyllerInntekstkrav} ukesats={ukesats} periodeAntallUker={periodeAntallUker} />;
};

export default Kalkulator;
