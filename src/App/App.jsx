import React, { useState } from "react";
import { init } from "@sentry/browser";
import Header from "../Components/Header";
import BackButton from "../Components/BackButton";
import SamtykkePanel from "../Kalkulator/SamtykkePanel";
import Spacer from "../Components/Spacer";
import Kalkulator from "../Kalkulator/Kalkulator";
import ErrorBoundary from "../Components/ErrorBoundary";
import { instance } from "../Api";
import "./App.less";
import Notifikasjoner from "../Components/Notifikasjoner";
import { logAktivitet, logSamtykkeKnapp } from "../lib/tracking";

// sentry
const environment = window.location.hostname;
init({
  dsn: "https://26768d0f8af64d66901466f17b51d1fe@sentry.gc.nav.no/22",
  environment,
  autoSessionTracking: false,
});

export const App = () => {
  const [isSamtykke, setSamtykke] = useState(false);
  const [errors, setError] = useState({ hasError: false, status: null, statusText: null });
  // axios apply interceptor on response
  instance.interceptors.response.use(
    (response) => response,
    (error) => setError({ hasError: true, ...error })
  );

  const handleSetSamtykke = () => {
    logAktivitet({ aktivitet: "Bruker trykker på fortsettknapp for å starte dagpengeberegning (ukjent om innlogget eller ikke)" });
    setSamtykke(true);
  };

  const hasSamtykke = window.location.search === "?samtykke=true";

  return (
    <div className="App typo-normal">
      <main role="main">
        <Header />
        <div className="content">
          <Notifikasjoner />
          <Spacer twentyPx />
          <ErrorBoundary apiErrors={errors}>{isSamtykke || hasSamtykke ? <Kalkulator /> : <SamtykkePanel onClickCallback={handleSetSamtykke} />}</ErrorBoundary>
          <Spacer twentyPx />
          <BackButton />
          <Spacer twentyPx />
        </div>
      </main>
    </div>
  );
};

export default App;
