import { Normaltekst } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import Minstekrav from './Minstekrav';

export default function PositiveResponse({ beløp, periode }) {
  return (
    <div>
      <Normaltekst>
        <h3>
          {' '}
          Ifølge a-ordningen ser det ut til at du vil få
          {' '}
          <em>
            { beløp }
          </em>
          {' '}
          i
          <em>
            { periode }
          </em>
          {' '}
          uker
          <Minstekrav />
        </h3>
        <b>
          Får du likevel avslag på grunn av for lav inntekt, kan det være
          fordi:
        </b>
        <ul className="a">
          <li>
            Inntektene har blitt brukt opp i en tidligere dagpengeperiode.
          </li>
          <li>
            Du får innvilget dagpenger fra en dato fram i tid. Da vil
            inntekter beregnes fra kravsdato.
          </li>
          <li>
            Opplysningene i a-ordningen er feil.
          </li>
        </ul>

        <b>
          Vi anbefaler at du sender en søknad om dagpenger selv hvis du er
          usikker på om du har tjent nok, så kan en saksbehandler vurdere
          dette.
        </b>
      </Normaltekst>
    </div>
  );
}

PositiveResponse.propTypes = {
  beløp: PropTypes.number,
  periode: PropTypes.string,
};
