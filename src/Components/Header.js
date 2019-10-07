import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { withTranslation } from 'react-i18next';

 function Header({t}) {
  const style = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  }
  return (
    <div className="header" style={style}>
      <img src="https://www.nav.no/_public/beta.nav.no/images/logo.png?_ts=1512923c9b0" alt="NAV-logo-rød-trans-bg-200.png" />
      <Sidetittel>
        {t("header_sidetittel")}
      </Sidetittel>
    </div>
  );
}
export default withTranslation() (Header)
