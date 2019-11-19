import React, { useState } from 'react';
import { init } from '@sentry/browser';
import { useTranslation } from 'react-i18next';
import Header from '../Components/Header';
import BackButton from '../Components/BackButton';
import SamtykkePanel from '../Kalkulator/SamtykkePanel';
import Spacer from '../Components/Spacer';
import Kalkulator from '../Kalkulator/Kalkulator';
import LanguageSelector from '../Components/LanguageSelector';
import ErrorBoundary from '../Components/ErrorBoundary';
import { instance } from '../Api';
import './App.css';
import AlertStripe from 'nav-frontend-alertstriper';

const environment = window.location.hostname;

init({
  dsn: 'https://07ffd2b8012e4e9ba2a6643e2864d828@sentry.nav.no/21',
  environment,
});

export const App = () => {
  const { t } = useTranslation();
  const [isSamtykke, setSamtykke] = useState(false);
  const [errors, setError] = useState({ hasError: false, status: null, statusText: null });
  // apply interceptor on response
  instance.interceptors.response.use(response => response, error => setError({ hasError: true, ...error }));

  const handleSetSamtykke = () => {
    setSamtykke(true);
  };

  return (
    <div className="App">
      <div className="toolbar">
        <LanguageSelector />
      </div>
      <Header />

      <div className="content">
        <AlertStripe type="info">{t('APP.BETA')}</AlertStripe>
        <Spacer twentyPx />
        <ErrorBoundary apiErrors={errors}>{isSamtykke ? <Kalkulator /> : <SamtykkePanel onClickCallback={handleSetSamtykke} />}</ErrorBoundary>
        <Spacer twentyPx />
        <BackButton />
        <Spacer twentyPx />
      </div>
    </div>
  );
};

export default App;
