import React from 'react';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { useTranslation } from 'react-i18next';

 
function TilbakeTilInfoKnapp() {
  const { t, i18n } = useTranslation()
  return (
    <a href="http://nav.no/dagpenger" style={{ color: 'none', textDecoration: 'none' }}>
      <Tilbakeknapp mini>{t("TilbakeTilInfoKnapp")}</Tilbakeknapp>
    </a>
  );
}
export default (TilbakeTilInfoKnapp)