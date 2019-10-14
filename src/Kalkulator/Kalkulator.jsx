import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingMessage from '../Components/LoadingMessage';
import api from '../Api/Api';
import QualifiedMessage from './QualifiedMessage';

const Kalkulator = ({ addErrorCallback }) => {
  const [loading, setLoading] = useState(true);
  const [IsOppfyllerInntekstkrav, setoppfyllerInntekstkrav] = useState(false);
  const [antallUker, setAntallUker] = useState(0);
  const [ukesats, setUkesats] = useState(0);
  const [isVerified, setVerified] = useState(false);

  const localPayload = {
    aktorId: process.env.REACT_APP_aktorId,
    vedtakId: process.env.REACT_APP_vedtakId,
    beregningsdato: process.env.REACT_APP_beregningsdato,
  };
  const localparams = JSON.stringify(localPayload);

  const setData = json => {
    setoppfyllerInntekstkrav(json.oppfyllerMinstekrav);
    setAntallUker(json.periodeAntalluker);
    setUkesats(json.ukeSats);
    setLoading(false);
  };

  const transform = data => ({
    oppfyllerMinstekrav: data.minsteinntektResultat.oppfyllerMinsteinntekt,
    periodeAntalluker: data.periodeResultat.periodeAntallUker,
    ukeSats: data.satsResultat.ukesats,
  });

  // TODO try catch med await async
  useEffect(() => {
    if (isVerified) {
      api
        .startBehov(localparams)
        .then(transform)
        .then(setData)
        .catch(error => {
          // if error == 401 redirect
          addErrorCallback(error);
        });
      // setData({oppfyllerMinstekrav:true, periodeAntalluker:13, ukeSats:54000})
    } else {
      api
        .verifyToken()
        .then(setVerified(true))
        .catch(
          setVerified(true), // TODO: DELETE BEFORE DEPLOYMENY
          // api.redirectToLogin()
        );
    }
  }, [addErrorCallback, isVerified, localparams]);

  if (loading) {
    return <LoadingMessage />;
  }
  return <QualifiedMessage oppfyllerInntekstkrav={IsOppfyllerInntekstkrav} ukesats={ukesats} periodeAntalluker={antallUker} />;
};

Kalkulator.propTypes = {
  addErrorCallback: PropTypes.func.isRequired,
};

export default Kalkulator;
