import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'moment/locale/nb';
import Spinner from 'nav-frontend-spinner';
import { I18nextProvider } from 'react-i18next';
import App from './App/App';
import i18n from './i18n';
import './index.css';

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  </I18nextProvider>,
  document.getElementById('root'),
);
