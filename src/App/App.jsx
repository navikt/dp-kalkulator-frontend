import React, { useState } from 'react';
import Header from '../Components/Header';
import TilbakeTilInfoKnapp from '../Components/TilbakeTilInfoKnapp';
import SamtykkePanel from '../Kalkulator/SamtykkePanel';
import Feilmelding from '../Components/Feilmelding';
import Spacer from '../Components/Spacer';
import Kalkulator from '../Kalkulator/Kalkulator';
import Sprakvelger from '../Components/Sprakvelger';

import './App.css';

const App = () => {
  const [isSamtykke, setSamtykke] = useState(false);
  const [errorObjects, setErrorObjects] = useState([]);

  const addError = error => setErrorObjects(errorObjects.concat(error));

  const handleRemoveError = index => setErrorObjects(errorObjects.filter((_, i) => i !== index));

  const handleSetSamtykke = () => {
    setSamtykke(true);
  };

  return (
    <div className="App">
      <Header />
      <div className="content">
        <div className="toolbar flex">
          <Sprakvelger />
        </div>
        <Spacer twentyPx />
        <Feilmelding errors={errorObjects} onClick={handleRemoveError} />
        {isSamtykke ? <Kalkulator addErrorCallback={addError} /> : <SamtykkePanel onClickCallback={handleSetSamtykke} />}
        <Spacer twentyPx />
        <TilbakeTilInfoKnapp />
      </div>
    </div>
  );
};

export default App;
