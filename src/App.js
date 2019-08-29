import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import QualifiedMessage from './Components/QualifiedMessage';
import LoadingMessage from './Components/information/LoadingMessage';
import ErrorMessage from './Components/information/ErrorMessage';
import personIncomeService from './services/PersonIncome';
import TilbakeTilInfoKnapp from './Components/TilbakeTilInfoKnapp';
import Consent from "./Components/Consent";



const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorObject, setErrorObject] = useState([]);
  const [doesPersonQualify, setDoesPersonQualify] = useState(false);
  const [periodeAntalluker, setPeriodeAntallUker] = useState("");
  const [ukesats, setUkesats] = useState(0.0);
  const [consent, setConsent] = useState(false);
  const [estimated, setEstimated] = useState(false)
  const [feilMelding, setFeilmelding] = useState(false)

  const onEstimateClick = () => {
    if (consent){
      resolveFetchData()
    }
    else{
      setFeilmelding(true)
    }
  }

  const resolveFetchData = () => {
    setLoading(true)
    const urlAPI = '/api/inntekt/';
    const urlMock = `${process.env.PUBLIC_URL}/mock/mockInnsyn.json`;

    const setData = (json) => {
      setDoesPersonQualify(json.oppfyllerMinstekrav);
      setPeriodeAntallUker(json.periodeAntalluker);
      setUkesats(json.ukeSats);
    };

    const fetchData = (url) => {
      personIncomeService.get(url)
        .then((personIncomeInformation) => {
          console.log(personIncomeInformation);
          setData(personIncomeInformation);
        })
        .catch((e) => {
          const retrievedError = e.response;
          setErrorObject({ data: retrievedError.data, status: retrievedError.status, statusText: retrievedError.statusText });
          setError(true);
        });
      setLoading(false);
      setEstimated(true);
    };


    if (process.env.NODE_ENV === 'production') {
      fetchData(urlAPI);
    } else {
      fetchData(urlMock);
    }
  }

  const toggleConsent = () => {
    setConsent(!consent)
  }

  let feedback;
  if (loading) { feedback = (<LoadingMessage />); }
  else if (error) {
    feedback = <ErrorMessage error={errorObject} />;
  }
  else if(!loading && !estimated) {
    feedback = <Consent fetchData={onEstimateClick} consent={consent} toggle={toggleConsent} feilMelding={feilMelding}/>
  }
  else {
    feedback = <QualifiedMessage doesPersonQualify={doesPersonQualify} ukeSats={ukesats} periodeAntalluker={periodeAntalluker} />;
  }


  return (
    <div className="App">
      <div className="row">
        <Header className="maxWidth" />
      </div>
      <div className="row">
        <div className="col-xs-12">
          <TilbakeTilInfoKnapp />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          { feedback }
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <TilbakeTilInfoKnapp />
        </div>
      </div>


    </div>
  );
};

export default App;
