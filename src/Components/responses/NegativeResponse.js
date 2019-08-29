import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

export default function NegativeResponse() {
  const divStyle = {
    padding: '0px 10px 5px 10px',
  };

  const tekstPadding = {
    paddingTop: '10px',
  };

  const fontSize = {
    fontSize: '1.3em',
  };

  return (
    <div style={divStyle}>
      <Element style={fontSize}>
        Søker du om dagpenger fra i dag, risikerer du å få avslag på grunn av for lav inntekt
      </Element>
      <Normaltekst>
          Dette er basert på oppplysninger om dine innteker fra
        {' '}
        <Lenke href="http://skatteetaten.no/mineinntekter">skatteetaten.no/mineinntekter</Lenke>
          . Er inntektsopplysningene feil, kan du likevel ha rett til dagpenger.
      </Normaltekst>
      <Normaltekst style={{ ...tekstPadding, ...fontSize }}>
        Du kan også ha rett på dagpenger om du
      </Normaltekst>
      <ul className="a">
        <Normaltekst style={fontSize}>
          <li>nylig har avtjent verneplikt</li>
          <li>søker frem i tid</li>
          <li>har arbeidet i et annet EØS-land</li>
          <li>har hatt inntekt fra fangst og fiske</li>
        </Normaltekst>
      </ul>
      <Element style={fontSize}>
        Denne beregningen er ikke juridisk bindende. Vi anbefaler deg uansett å søke, slik at vi kan vurdere om du har rett til dagpenger.
      </Element>

    </div>
  );
}
