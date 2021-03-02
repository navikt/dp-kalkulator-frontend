/* eslint-disable */ // Kan fjernes når eslint får fikset bug (feks ved bump til react-scripts 4.0.0)
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import Spinner from "nav-frontend-spinner";
import { I18nextProvider } from "react-i18next";
import App from "./App/App";
import i18n from "./lib/i18n";
import { injectDecoratorClientSide } from "@navikt/nav-dekoratoren-moduler";
import "./index.less";

if (process.env.NODE_ENV === "development") {
  injectDecoratorClientSide({
    env: "prod",
    breadcrumbs: [
      { title: "Arbeidssøker eller permittert", url: "https://www.nav.no/arbeid/no/" },
      { title: "Dagpengekalkulator", url: "https://www.nav.no/arbeid/dagpenger/kalkulator/" },
    ],
  });
}

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  </I18nextProvider>,
  document.getElementById("root")
);
