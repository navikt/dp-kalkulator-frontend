import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="header">
      <img src="https://www.nav.no/_public/beta.nav.no/images/logo.png" alt="NAV-logo-rød-trans-bg-200.png" />
      <Sidetittel>{t('header_sidetittel')}</Sidetittel>
    </header>
  );
};
export default Header;
