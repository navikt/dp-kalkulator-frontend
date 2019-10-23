import React from 'react';
import PropTypes from 'prop-types';
import { Element, Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { useTranslation, Trans } from 'react-i18next';

export const PositiveResponse = ({ ukesats, periodeAntallUker }) => {
  const { t } = useTranslation();

  return (
    <>
      <Element>{t('POSITIVERESPONSE.IDAG_FÅTT_OMTRENT')}</Element>
      <Innholdstittel tag="h3">{t('POSITIVERESPONSE.UKESATS_HVER_UKE', { ukesats, periodeAntallUker })}</Innholdstittel>
      <Normaltekst>
        <Trans i18nKey="POSITIVERESPONSE.GJELDER_KUN_DU_OPPFYLLER_VILKÅR">
          <Lenke href="http://nav.no/dagpenger" />
        </Trans>
      </Normaltekst>
      <Normaltekst>
        <Trans i18nKey="POSITIVERESPONSE.ANBEFALER_SENDE_SØKNAD_ANTALL_UKER">
          <Lenke href="https://www.nav.no/soknader/nb/person/arbeid/dagpenger" />
        </Trans>
      </Normaltekst>
      <Normaltekst>
        <Trans i18nKey="POSITIVERESPONSE.BEREGNINGEN_ER_BASERT_PÅ_OPPLYSNINGER">
          <Lenke href="https://skatteetaten.no/mineinntekter" />
        </Trans>
      </Normaltekst>
    </>
  );
};

PositiveResponse.propTypes = {
  ukesats: PropTypes.number.isRequired,
  periodeAntallUker: PropTypes.number.isRequired,
};
export default PositiveResponse;
