import React from 'react';
import PropTypes from 'prop-types';
import { Element, Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { useTranslation, Trans } from 'react-i18next';

export const PositiveResponse = ({ ukesats, periodeAntallUker }) => {
  const { t } = useTranslation();

  return (
    <>
      <Element>{t('PositiveResponse_info1')}</Element>
      <Innholdstittel tag="h3">{t('PositiveResponse_info_sats', { ukesats, periodeAntallUker })}</Innholdstittel>
      <Normaltekst>
        <Trans i18nKey="PositiveResponse_vilkar">
          <Lenke href="http://nav.no/dagpenger" />
        </Trans>
      </Normaltekst>
      <Normaltekst>
        <Trans i18nKey="PositiveResponse_anbefaling">
          <Lenke href="https://www.nav.no/soknader/nb/person/arbeid/dagpenger" />
        </Trans>
      </Normaltekst>
      <Normaltekst>
        <Trans i18nKey="PositiveResponse_beregning">
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
