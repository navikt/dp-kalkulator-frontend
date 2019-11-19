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
    <Tilbakeknapp mini onClick={event => handleOnClick(event)}>
      {t('KNAPP.TILBAKE')}
    </Tilbakeknapp>
  );
};
export default BackButton;
