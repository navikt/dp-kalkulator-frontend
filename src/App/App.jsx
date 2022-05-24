import React, { useState } from "react";
import { init } from "@sentry/browser";
import Header from "../Components/Header";
import BackButton from "../Components/BackButton";
import Spacer from "../Components/Spacer";
import "./App.less";
import Notifikasjoner from "../Components/Notifikasjoner";
import PreviewBanner from "../Components/PreviewBanner";

// sentry
const environment = window.location.hostname;
init({
  dsn: "https://26768d0f8af64d66901466f17b51d1fe@sentry.gc.nav.no/22",
  environment,
  autoSessionTracking: false,
});

export const App = () => {
  return (
    <div className="App typo-normal">
      <PreviewBanner />
      <main role="main">
        <Header />
        <div className="content">
          <Notifikasjoner />

          <BackButton />
          <Spacer twentyPx />
        </div>
      </main>
    </div>
  );
};

export default App;
