import React from 'react';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { useTranslation, Trans } from 'react-i18next';
import Spacer from '../Components/Spacer';

const NegativeResponse = () => {
  const { t } = useTranslation();

  return (
    <>
      <Undertittel tag="h3">{t('NegativeResponse')}</Undertittel>
      <Normaltekst>
        <Trans i18nKey="NegativeResponse_inntektsopplysning_informasjon">
          <Lenke href="https://skatteetaten.no/mineinntekter" />
        </Trans>
      </Normaltekst>
      <Spacer twentyPx />
      <Element>{t('NegativeResponse_listheader')}</Element>
      <ul>
        <li>{t('NegativeResponse_listitems1')}</li>
        <li>{t('NegativeResponse_listitems2')}</li>
        <li>{t('NegativeResponse_listitems3')}</li>
        <li>{t('NegativeResponse_listitems4')}</li>
      </ul>
      <Element>
        <Trans i18nKey="NegativeResponse_soknadsanbefaling">
          <Lenke href="https://www.nav.no/soknader/nb/person/arbeid/dagpenger" />
        </Trans>
      </Element>
    </>
  );
};
export default NegativeResponse;
