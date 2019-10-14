import { Element, Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { useTranslation, Trans } from 'react-i18next';

function PositiveResponse({ ukeSats, periodeAntalluker }) {
  const { t } = useTranslation();

  return (
    <div className="padding16">
      <Innholdstittel>Dagpengekalkulator</Innholdstittel>
      <Normaltekst>{t('PositiveResponse_info1')}</Normaltekst>
      <Element>{t('PositiveResponse_info_sats', { uke_sats: ukeSats, periode_antalluker: periodeAntalluker })}</Element>
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
    </div>
  );
}

PositiveResponse.propTypes = {
  ukeSats: PropTypes.number,
  periodeAntalluker: PropTypes.number,
};
export default PositiveResponse;
