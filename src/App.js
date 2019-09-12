import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import TilbakeTilInfoKnapp from './Components/TilbakeTilInfoKnapp';
import Consent from "./Components/Consent";
import Feilmelding from './Components/information/Feilmelding'
import Kalkulator from './Components/Kalkulator/Kalkulator'


const App = () => {
  const [consent, setConsent] = useState(false);
  const [errorObjects, setErrorObjects] = useState([])
  const [checkedHjelpeTekst, setCheckedHjelpeTekst] = useState(false)

  const addError = (error) => {
    setErrorObjects(errorObjects.concat(error))
  }

  const verifyAndSetConsent = (checked) => {
    checked ? setConsent(checked) : setCheckedHjelpeTekst(true)
  }


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
          {consent ? 
            <Kalkulator addError={addError}/> : 
            <Consent consent={consent} onClick={verifyAndSetConsent} hjelpeTekst={checkedHjelpeTekst}/>
          }
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
