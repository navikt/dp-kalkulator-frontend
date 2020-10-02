/* eslint-disable */ // Kan fjernes når eslint får fikset bug (feks ved bump til react-scripts 4.0.0)
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import Spinner from "nav-frontend-spinner";
import { I18nextProvider } from "react-i18next";
import App from "./App/App";
import i18n from "./lib/i18n";
import "./index.less";

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  </I18nextProvider>,
  document.getElementById("root")
);
