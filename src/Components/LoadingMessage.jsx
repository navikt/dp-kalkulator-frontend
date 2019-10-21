import React from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst } from 'nav-frontend-typografi';
import { useTranslation } from 'react-i18next';

const LoadingMessage = props => {
  const { t } = useTranslation();
  return (
    <div className="flex center vertical textcenter">
      <NavFrontendSpinner {...props} />
      <Normaltekst>{t('LoadingMessage_informasjon')}</Normaltekst>
      <Normaltekst>{t('LoadingMessage_ventetid')}</Normaltekst>
    </div>
  );
};
export default LoadingMessage;
