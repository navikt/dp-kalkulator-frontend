import React from 'react';
import PanelBase from 'nav-frontend-paneler';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst } from 'nav-frontend-typografi';
import { withTranslation } from 'react-i18next';

function LoadingMessage({t}) {
  const style = {
    display: 'flex',
    flexDirection: 'column'
  }

  return (
    <PanelBase style={style}>
      <NavFrontendSpinner style={{alignSelf: 'center'}} />
      <Normaltekst>
        {t("LoadingMessage_informasjon")}
        </Normaltekst>
      <Normaltekst>
        {t("LoadingMessage_ventetid")}
      </Normaltekst>
    </PanelBase>
  );
}
export default withTranslation()