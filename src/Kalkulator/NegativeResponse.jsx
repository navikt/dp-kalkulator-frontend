import React from 'react';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { useTranslation, Trans } from 'react-i18next';

const NegativeResponse = () => {
  const { t } = useTranslation();

  return (
    <>
      <Undertittel tag="h3">{t('NEGATIVERESPONSE.RISIKERER_AVSLAG_GRUNNET_LAV_INNTEKT')}</Undertittel>
      <Element>{t('NEGATIVERESPONSE.LIKEVEL_RETT')}</Element>
      <ul>
        <li>{t('NEGATIVERESPONSE.AVTJENT_VERNEPLIKT')}</li>
        <li>{t('NEGATIVERESPONSE.SØKER_FREM_I_TID')}</li>
        <li>{t('NEGATIVERESPONSE.ARBEIDET_I_EØS')}</li>
        <li>{t('NEGATIVERESPONSE.INNTEKT_FRA_FANGST_OG_FISK')}</li>
        <li>
          <Trans i18nKey="NEGATIVERESPONSE.INNTEKTOPPLYSNINGER_ER_FEIL">
            <Lenke href="https://www.nav.no/soknader/nb/person/arbeid/dagpenger" />
          </Trans>
        </li>
      </ul>
      <Normaltekst>
        <Trans i18nKey="POSITIVERESPONSE.ANBEFALER_SENDE_SØKNAD_ANTALL_UKER">
          <Lenke href="https://www.nav.no/soknader/nb/person/arbeid/dagpenger" />
        </Trans>
      </Normaltekst>
    </>
  );
};
export default NegativeResponse;
