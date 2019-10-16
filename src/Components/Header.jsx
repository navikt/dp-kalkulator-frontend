import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="header">
      <Sidetittel>{t('header_sidetittel')}</Sidetittel>
    </header>
  );
};
export default Header;
