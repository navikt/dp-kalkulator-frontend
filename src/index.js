import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'moment/locale/nb';
import { Suspense} from 'react' ;
import Spinner from 'react-spinner' ;
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
    <Suspense fallback={<Spinner />}>
    <App />
    </Suspense>
    </I18nextProvider>, 
document.getElementById('root'));
