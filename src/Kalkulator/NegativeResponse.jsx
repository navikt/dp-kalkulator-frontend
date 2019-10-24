import React from 'react';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { useTranslation, Trans } from 'react-i18next';
import Spacer from '../Components/Spacer';

const NegativeResponse = () => {
  const { t } = useTranslation();

  return (
    <>
      <Undertittel tag="h3">{t('NEGATIVERESPONSE.RISIKERER_AVSLAG_GRUNNET_LAV_INNTEKT')}</Undertittel>
      <Normaltekst>
        <Trans i18nKey="NEGATIVERESPONSE.BEREGNING_BASERT_PÅ_INNTEKTSOPPLYSNINGER">
          <Lenke href="https://skatteetaten.no/mineinntekter" />
        </Trans>
      </Normaltekst>
      <Spacer twentyPx />
      <Element>{t('NEGATIVERESPONSE.LIKEVEL_RETT')}</Element>
      <ul>
        <li>{t('NEGATIVERESPONSE.AVTJENT_VERNEPLIKT')}</li>
        <li>{t('NEGATIVERESPONSE.SØKER_FREM_I_TID')}</li>
        <li>{t('NEGATIVERESPONSE.ARBEIDET_I_EØS')}</li>
        <li>{t('NEGATIVERESPONSE.INNTEKT_FRA_FANGST_OG_FISK')}</li>
      </ul>
      <Element>
        <Trans i18nKey="NEGATIVERESPONSE.ANFEBALER_AT_DU_SENDER_SØKNAD">
          <Lenke href="https://www.nav.no/soknader/nb/person/arbeid/dagpenger" />
        </Trans>
      </Element>
    </>
  );
};
export default NegativeResponse;
