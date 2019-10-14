import React from 'react';
import { Element, Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { useTranslation, Trans } from 'react-i18next';

function NegativeResponse() {
  const { t } = useTranslation();

  return (
    <div className="padding16">
      <Innholdstittel>{t('NegativeResponse_innholdstittel')}</Innholdstittel>
      <Element>{t('NegativeResponse')}</Element>
      <Normaltekst>
        <Trans i18nKey="NegativeResponse_inntektsopplysning_informasjon">
          <Lenke href="https://skatteetaten.no/mineinntekter" />
        </Trans>
      </Normaltekst>
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
    </div>
  );
}
export default NegativeResponse;
