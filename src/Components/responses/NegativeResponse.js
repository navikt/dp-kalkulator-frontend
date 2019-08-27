import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';

export default function NegativeResponse() {

  const divStyle = {
    padding: '0px 10px 5px 10px'
  }

  const tekstPadding = {
    paddingTop: '10px'
  }

  const fontSize = {
    fontSize: '1.3em'
  }

  return (
    <div style={divStyle}>
      <Element style={fontSize}>
        Søker du om dagpenger fra i dag kan det være at du får avslag på grunn av for lav inntekt
        </Element>
    
      <Normaltekst style={{...tekstPadding, ...fontSize}}>
        Du kan likevel ha rett på dagpenger om
      </Normaltekst>
      <ul className="a">
        <li>du nylig har avtjent verneplikt</li>
        <li>søker frem i tid</li>
        <li>har arbeidet i et annet EØS-land</li>
        <li>har hatt inntekt fra fangst og fiske</li>
        <li>inntektsopplysningene vi har om deg er feil</li>
      </ul>

      <Element style={fontSize}>
        Vi anbefaler deg å søke om dagpenger slik at en saksbehandler kan vurdere om du har rett til dette
        </Element>

    </div>
  );
}
