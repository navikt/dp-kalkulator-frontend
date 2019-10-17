import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingMessage from '../Components/LoadingMessage';
import api from '../Api/Api';
import QualifiedMessage from './QualifiedMessage';

const Kalkulator = ({ addErrorCallback }) => {
  const [isLoading, setLoading] = useState(true);
  const [isOppfyllerInntekstkrav, setOppfyllerInntekstkrav] = useState(false);
  const [periodeAntallUker, setPeriodeAntallUker] = useState(0);
  const [ukesats, setUkesats] = useState(0);
  const [isVerified, setVerified] = useState(true);

  // todo fjerne rerender da dette fører til henting av data kontinuerlig
  const localPayload = {
    aktorId: process.env.REACT_APP_aktorId,
    vedtakId: process.env.REACT_APP_vedtakId,
    beregningsdato: process.env.REACT_APP_beregningsdato,
  };
  const localparams = JSON.stringify(localPayload);

  useEffect(() => {
    async function fetchData() {
      if (isVerified) {
        try {
          // FIXME: MOCK FOR NOW
          // const response = await api.startBehov(localparams);
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
          const { minsteinntektResultat, periodeResultat, satsResultat } = response;
          setOppfyllerInntekstkrav(minsteinntektResultat.oppfyllerMinsteinntekt);
          setPeriodeAntallUker(periodeResultat.periodeAntallUker);
          setUkesats(satsResultat.ukesats);
          setLoading(false);
        } catch (error) {
          addErrorCallback(error);
          throw new Error(error);
        }
      } else {
        try {
          await api.verifyToken(localparams);
          await setVerified(true);
        } catch (error) {
          setVerified(true); // TODO: DELETE BEFORE DEPLOYMENY
          // api.redirectToLogin()
          throw new Error(error);
        }
      }
    }
    fetchData();
  }, [addErrorCallback, isVerified, localparams]);

  if (isLoading) {
    return <LoadingMessage />;
  }
  return <QualifiedMessage isOppfyllerInntekstkrav={isOppfyllerInntekstkrav} ukesats={ukesats} periodeAntallUker={periodeAntallUker} />;
};

Kalkulator.propTypes = {
  addErrorCallback: PropTypes.func.isRequired,
};

export default Kalkulator;
