import React from 'react';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { useTranslation } from 'react-i18next';
import tracking from '../lib/tracking';

const BackButton = () => {
  const { t } = useTranslation();

  const handleOnClick = event => {
    event.preventDefault();
    tracking.logEvent('TILBAKE_TIL_DAGPENGER');
    window.location.assign('https://www.nav.no/arbeid/dagpenger/permittert');
  };

  return (
    <Tilbakeknapp mini onClick={event => handleOnClick(event)}>
      {t('KNAPP.TILBAKE')}
    </Tilbakeknapp>
  );
};
export default BackButton;
