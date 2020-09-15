import React from 'react';
import { useTranslation } from 'react-i18next';
import tracking from '../lib/tracking';
import Lenke from 'nav-frontend-lenker';
import NavFrontendChevron from 'nav-frontend-chevron';
import LENKER from "../lib/constants";

const BackButton = () => {
  const { t } = useTranslation();

  return (
    <Lenke
      className={'knapp--kompakt knapp--mini knapp--flat knapp'}
      onClick={() => tracking.logEvent('TILBAKE_TIL_DAGPENGER')}
      href={LENKER.DAGPENGER_FAKTASIDE_URL}
    >
      <NavFrontendChevron type="venstre" /> {t('KNAPP.TILBAKE')}
    </Lenke>
  );
};
export default BackButton;
