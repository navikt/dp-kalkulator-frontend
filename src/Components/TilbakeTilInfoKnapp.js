import React from 'react';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { withTranslation } from 'react-i18next';

 function TilbakeTilInfoKnapp({t}) {
  return (
    <a href="http://nav.no/dagpenger" style={{ color: 'none', textDecoration: 'none' }}>
      <Tilbakeknapp mini>{t("TilbakeTilInfoKnapp")}</Tilbakeknapp>
    </a>
  );
}
export default withTranslation() (TilbakeTilInfoKnapp)