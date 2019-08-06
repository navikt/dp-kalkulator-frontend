import React from 'react';
import Minstekrav from './Minstekrav';

export default function NegativeResponse() {
  return (
    <div>
      <h4>
        {' '}
        Ifølge a-ordningen har du tjent under minstekravet for å ha rett på
        dagpenger.
        <Minstekrav />
      </h4>

      <b>Du kan likevel ha tjent nok til å ha rett på dagpenger hvis:</b>
      <ul className="a">
        <li>Du har hatt verneplikt.</li>
        <li>Du får innvilget dagpenger fra en dato fram i tid.</li>
        <li>Du har hatt arbeid i et annet EØS-land.</li>
        <li>Opplysningene i a-ordningen er feil.</li>
      </ul>
      <b>
        Vi anbefaler at du sender en søknad om dagpenger selv hvis du er
        usikker på om du har tjent nok, så kan en saksbehandler vurdere
        dette.
      </b>
    </div>
  );
}
