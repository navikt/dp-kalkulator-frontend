import React from 'react';
import Panel from "nav-frontend-paneler";
import { Element, Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

export default function NegativeResponse() {

  const padding = {
    padding: '10px'
  }

  const headerMargin = {
    marginBottom: '15px'
  }

  const listMargin = {
    marginTop: '5px'
  }

  return (

    <div style={padding}>
      <Innholdstittel style={headerMargin}>Dagpengekalkulator</Innholdstittel>
      <Element style={headerMargin}>Søker du om dagpenger fra i dag, risikerer du å få avslag på grunn av for lav inntekt.</Element>
      <Normaltekst style={headerMargin}>
        Beregningen er basert på inntektsopplysninger fra <Lenke href="http://skatteetaten.no/mineinntekter">skatteetaten.no/mineinntekter</Lenke>
        . Hvis opplysningene er feil, bør de rettes.
     </Normaltekst>
      <Element>
        Du kan likevel ha rett på dagpenger om du
      </Element>
      <Normaltekst>
        <ul style={listMargin}>
          <li>nylig har avtjent verneplikt</li>
          <li>søker fram i tid</li>
          <li>har arbeidet i et annet EØS-land</li>
          <li>har hatt inntekt fra fangst og fisk</li>
        </ul>
      </Normaltekst>
      <Element>Vi anbefaler uansett at du sender <Lenke href="https://www.nav.no/soknader/nb/person/arbeid/dagpenger">søknad om dagpenger</Lenke></Element>
    </div>

  );
}
