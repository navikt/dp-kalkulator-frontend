import React from 'react';
import Panel from "nav-frontend-paneler";
import { Element, Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { useTranslation, Trans } from 'react-i18next';

 function NegativeResponse() {
  const { t, i18n } = useTranslation()
  const padding = {
    padding: '10px'
  }

  const textMargin = {
    marginBottom: '15px'
  }

  const listMargin = {
    marginTop: '5px'
  }

  const mineinntekter = "skatteetaten.no/mineinntekter"
  
  return (
    <div style={padding}>
      <Innholdstittel style={textMargin}>{t( "NegativeResponse_innholdstittel")}</Innholdstittel>
      <Element style={textMargin}>{t("NegativeResponse")}</Element>
      <Normaltekst style={textMargin}>
        <Trans i18nKey="NegativeResponse_inntektsopplysning_informasjon">
          <Lenke href="http://skatteetaten.no/mineinntekter"></Lenke>
        </Trans>
     </Normaltekst>
      <Element>
        {t("NegativeResponse_listheader")}
      </Element>
    
        <ul style={listMargin}>
          <li>{t("NegativeResponse_listitems1")}</li>
          <li>{t("NegativeResponse_listitems2")}</li>
          <li>{t("NegativeResponse_listitems3")}</li>
          <li>{t("NegativeResponse_listitems4")}</li>
        </ul>
    
      <Element>
         <Trans i18nKey="NegativeResponse_soknadsanbefaling">   
           <Lenke href="https://www.nav.no/soknader/nb/person/arbeid/dagpenger"></Lenke>
         </Trans>
      </Element>
    </div>

  );
}
export default (NegativeResponse);
