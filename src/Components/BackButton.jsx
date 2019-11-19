import React from 'react';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { useTranslation } from 'react-i18next';

const BackButton = () => {
  const { t } = useTranslation();

  const handleOnClick = event => {
    event.preventDefault();
    window.history.back();
  };

  return (
    <a href="https://nav.no/dagpenger">
      <Tilbakeknapp mini>{t('KNAPP.TILBAKE')}</Tilbakeknapp>
    </a>
  );
};
export default BackButton;
