import React, { useState } from 'react';
import { init } from '@sentry/browser';
import axios from 'axios';
import Header from '../Components/Header';
import BackButton from '../Components/BackButton';
import SamtykkePanel from '../Kalkulator/SamtykkePanel';
import Spacer from '../Components/Spacer';
import Kalkulator from '../Kalkulator/Kalkulator';
import LanguageSelector from '../Components/LanguageSelector';
import ErrorBoundary from '../Components/ErrorBoundary';

import './App.css';

const environment = window.location.hostname;

init({
  dsn: 'https://07ffd2b8012e4e9ba2a6643e2864d828@sentry.nav.no/21',
  environment,
});

export const App = () => {
  const [isSamtykke, setSamtykke] = useState(false);
  const [errors, setError] = useState({ hasError: false, status: null, statusText: null });
  // apply interceptor on response
  axios.interceptors.response.use(response => response, error => setError({ hasError: true, ...error }));

  const handleSetSamtykke = () => {
    setSamtykke(true);
  };

  return (
    <div className="App">
      <ErrorBoundary apiErrors={errors}>
        <Header />
        <div className="content">
          <div className="toolbar flex">
            <LanguageSelector />
          </div>
          <Spacer twentyPx />
          {isSamtykke ? <Kalkulator /> : <SamtykkePanel onClickCallback={handleSetSamtykke} />}
          <Spacer twentyPx />
          <BackButton />
          <Spacer twentyPx />
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default App;
