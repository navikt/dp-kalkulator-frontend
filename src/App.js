import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import TilbakeTilInfoKnapp from './Components/TilbakeTilInfoKnapp';
import Consent from "./Components/Consent";
import Feilmelding from './Components/information/Feilmelding'
import Kalkulator from './Components/Kalkulator/Kalkulator'
import Sprakvelger from './Components/Kalkulator/sprak/sprakvelger';


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

const flex_grid = {
  flex: 1,
  flexDirection: "row",
  display: "flex",
  justifyContent:"space-between"
}
const col_80 = {
  width: "70%"
}
const col_20 = {
  width: "20%",
}

  return (
    <div className="App">
      <Header />
      <div style={flex_grid}>
      <TilbakeTilInfoKnapp style={col_80} /> 
      <Sprakvelger style={col_20} />
      </div>
      
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
