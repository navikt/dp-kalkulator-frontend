import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import TilbakeTilInfoKnapp from './Components/TilbakeTilInfoKnapp';
import Consent from "./Components/Consent";
import Feilmelding from './Components/information/Feilmelding'
import Kalkulator from './Components/Kalkulator/Kalkulator'


const App = () => {
  const [consent, setConsent] = useState(false);
  const [errorObjects, setErrorObjects] = useState([])
  
  const addError = (error) => setErrorObjects(errorObjects.concat(error))

  const handleRemoveError = (index) => {
    setErrorObjects(errorObjects.filter(
      (_, i) => {
        return i !== index
      }
    ))
  }

  const handleFortsettClick = () => {
    setConsent(true)
  }


  return (
    <div className="App">
      <Header />
      <TilbakeTilInfoKnapp />
      <Feilmelding errors={errorObjects} click={handleRemoveError} />
      {consent ?
        <Kalkulator addError={addError} /> :
        <Consent onClick={handleFortsettClick} />
      }
      <TilbakeTilInfoKnapp />
    </div>
  );
};

export default App;
