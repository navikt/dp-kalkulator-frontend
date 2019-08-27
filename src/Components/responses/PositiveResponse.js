import { Normaltekst } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import Minstekrav from './Minstekrav';

export default function PositiveResponse({ ukeSats, periodeAntalluker }) {
  return (
    <div>
        <h3>
          {' '}
          Det ser ut som du kan være kvalifisert for dagpenger
          <br />
          {' '}
          Du vil i så fall få
          {' '}
          <em>
            { ukeSats }
          </em>
          {' '}
          kr før skatt hver uke i
          {' '}
          <em>
            { periodeAntalluker }
          </em>
          {' '}
          uker
        </h3>

        <b>
          Får du likevel avslag på grunn av for lav inntekt, kan det være
          fordi:
        </b>
        <ul className="a">
          <li>
            <Normaltekst>
              Inntektene har blitt brukt opp i en tidligere dagpengeperiode.
            </Normaltekst>

          </li>
          <li>
            <Normaltekst>
              Du får innvilget dagpenger fra en dato fram i tid. Da vil
              inntekter beregnes fra kravsdato.
            </Normaltekst>

          </li>
          <li>
            <Normaltekst>
              Opplysningene i a-ordningen er feil.
            </Normaltekst>

          </li>
        </ul>

        <b>
          <Normaltekst>
            Vi anbefaler at du sender en søknad om dagpenger selv hvis du er
            usikker på om du har tjent nok, så kan en saksbehandler vurdere
            dette.
          </Normaltekst>

        </b>

    </div>
  );
}

PositiveResponse.propTypes = {
  ukeSats: PropTypes.number,
  periodeAntalluker: PropTypes.string,
};
