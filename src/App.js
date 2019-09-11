import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import QualifiedMessage from './Components/QualifiedMessage';
import LoadingMessage from './Components/information/LoadingMessage';
import ErrorMessage from './Components/information/ErrorMessage';

import TilbakeTilInfoKnapp from './Components/TilbakeTilInfoKnapp';
import Consent from "./Components/Consent";
import Feilmelding from './Components/Feilmelding'
import Kalkulator from './Components/Kalkulator/Kalkulator'


const App = () => {
  const [error, setError] = useState(null);
  const [errorObject, setErrorObject] = useState([]);
  const [doesPersonQualify, setDoesPersonQualify] = useState(false);
  const [periodeAntalluker, setPeriodeAntallUker] = useState(0.0);
  const [ukesats, setUkesats] = useState(0.0);
  const [consent, setConsent] = useState(false);
  const [estimated, setEstimated] = useState(false)
  const [feilMelding, setFeilmelding] = useState(false)
  const [pollingApi, setPollingApi] = useState(false)
  const [errorObjects, setErrorObjects] = useState([])

  // const localToken = process.env.REACT_APP_LOCALTOKEN
  // var tries = 0

  // const onEstimateClick = () => {
  //   if (consent) {
  //     resolveFetchData()
  //   }
  //   else {
  //     setFeilmelding(true)
  //   }
  // }


  // const toggleConsent = () => {
  //   setConsent(!consent)
  // }

  // let feedback;
  // if (loading) { feedback = (<LoadingMessage />); }
  // if (error) {
  //   feedback = <ErrorMessage error={errorObject} />;
  // }
  // else if (!loading && !estimated) {
  //   feedback = <Consent fetchData={onEstimateClick} consent={consent} toggle={toggleConsent} feilMelding={feilMelding} />
  // }
  // else {
  //   feedback = <QualifiedMessage doesPersonQualify={doesPersonQualify} ukeSats={ukesats} periodeAntalluker={periodeAntalluker} />;
  // }


  return (
    <div className="App">
      <Header className="maxWidth" />
      <div className="row">
        <div className="col-xs-12">
          <TilbakeTilInfoKnapp />
        </div>
      </div>
      <div className='row'>
        <div className="col-xs-12">
          <Feilmelding errors={errorObjects} />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          {/* {feedback} */}
          <Kalkulator/>
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
