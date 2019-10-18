import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import BackButton from '../Components/BackButton';
import SamtykkePanel from '../Kalkulator/SamtykkePanel';
import Feilmelding from '../Components/Feilmelding';
import Spacer from '../Components/Spacer';
import Kalkulator from '../Kalkulator/Kalkulator';
import LanguageSelector from '../Components/LanguageSelector';

import './App.css';

export const App = () => {
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
          <LanguageSelector />
        </div>
        <Spacer twentyPx />
        <Feilmelding errors={errorObjects} onClick={handleRemoveError} />
        {isSamtykke ? <Kalkulator addErrorCallback={addError} /> : <SamtykkePanel onClickCallback={handleSetSamtykke} />}
        <Spacer twentyPx />
        <BackButton />
      </div>
    </div>
  );
};

export default App;
