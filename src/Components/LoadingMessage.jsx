import React from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst } from 'nav-frontend-typografi';
import { useTranslation } from 'react-i18next';

function LoadingMessage() {
  const { t } = useTranslation();
  return (
    <div>
      <NavFrontendSpinner />
      <Normaltekst>{t('LoadingMessage_informasjon')}</Normaltekst>
      <Normaltekst>{t('LoadingMessage_ventetid')}</Normaltekst>
    </div>
  );
}
export default LoadingMessage;
