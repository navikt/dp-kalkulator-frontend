import { Element, Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { useTranslation, Trans } from 'react-i18next';

function PositiveResponse({ ukeSats, periodeAntalluker}) {
  const { t, i18n } = useTranslation()
  const padding = {
    padding: '10px'
  }

  const textMargin = {
    marginBottom: '15px'
  }


  return (
    <div style={padding}>
      <Innholdstittel style={textMargin}>Dagpengekalkulator</Innholdstittel>
      <Normaltekst >
        {t("PositiveResponse_info1")}
      </Normaltekst>
      <Element style={textMargin}>
        {t("PositiveResponse_info_sats", { uke_sats: ukeSats, periode_antalluker: periodeAntalluker })}
      </Element>
      <Normaltekst style={textMargin}>
        <Trans i18nKey="PositiveResponse_vilkar">
        <Lenke href="http://nav.no/dagpenger"></Lenke>.
        </Trans>
      </Normaltekst>
      <Normaltekst style={textMargin}>
       <Trans i18nKey="PositiveResponse_anbefaling">
          <Lenke href="https://www.nav.no/soknader/nb/person/arbeid/dagpenger"></Lenke>
       </Trans>
      </Normaltekst>
      <Normaltekst style={textMargin}>
      <Trans i18nKey="PositiveResponse_beregning">
        <Lenke href="http://skatteetaten.no/mineinntekter"></Lenke>
     </Trans>
      </Normaltekst>
    </div>
  );
}

PositiveResponse.propTypes = {
  ukeSats: PropTypes.number,
  periodeAntalluker: PropTypes.number,
};
export default (PositiveResponse)