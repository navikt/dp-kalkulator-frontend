import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import Lenke from 'nav-frontend-lenker';

export default function RapporteringInfo() {
  return (
    <Normaltekst>
      Din arbeidsgiver og andre som utbetaler inntekter til deg rapporterer disse opplysningene til a-ordningen minst én gang i måneden.
      <br />
      For flere detaljer og kontaktinfo for arbeidsgivere, besøk
      {' '}
      <Lenke
        className="skatteLenke"
        href="https://www.skatteetaten.no/skjema/mine-inntekter-og-arbeidsforhold/"
      >
        Skatteetaten
      </Lenke>
      .
      <br />
      Oppdager du feil? Ta kontakt med de som har rapportert opplysningene.
      <br />
    </Normaltekst>
  );
}
