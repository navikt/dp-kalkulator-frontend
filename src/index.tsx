/* eslint-disable */ // Kan fjernes når eslint får fikset bug (feks ved bump til react-scripts 4.0.0)
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Loader } from "@navikt/ds-react";
import App from "./App/App";
import { injectDecoratorClientSide } from "@navikt/nav-dekoratoren-moduler";
import "./index.css";
import { isDevelopment } from "./utils/environment";
import TextProvider from "./utils/TextProvider";

if (isDevelopment()) {
  injectDecoratorClientSide({
    env: "dev",
    breadcrumbs: [
      { title: "Arbeidssøker eller permittert", url: "https://www.nav.no/arbeid/no/" },
      { title: "Dagpengekalkulator", url: "https://www.nav.no/arbeid/dagpenger/kalkulator/" },
    ],
  });
}

ReactDOM.render(
  <TextProvider>
    <Suspense fallback={<Loader variant="neutral" size="3xlarge" />}>
      <App />
    </Suspense>
  </TextProvider>,
  document.getElementById("root")
);
