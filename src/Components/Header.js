import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { useTranslation } from 'react-i18next';

 function Header({}) {
  const style = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  }

  const { t, i18n } = useTranslation()

  return (
    <div className="header" style={style}>
      <img src="https://www.nav.no/_public/beta.nav.no/images/logo.png?_ts=1512923c9b0" alt="NAV-logo-rød-trans-bg-200.png" />
      <Sidetittel>
        {t('header_sidetittel')}
      </Sidetittel>
    </div>
  );
}
export default Header
