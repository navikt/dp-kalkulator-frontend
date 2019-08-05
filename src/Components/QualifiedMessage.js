import AlertStripe from 'nav-frontend-alertstriper';
import React from 'react';
import HjelpetekstBase from 'nav-frontend-hjelpetekst';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';

export default function QualifiedMessage({ doesPersonQualify, beløp, periode }) {
  return (
    <AlertStripe type={doesPersonQualify ? 'suksess' : 'advarsel'}>
      {doesPersonQualify ? <PositiveResponse beløp={beløp} periode={periode} /> : <NegativeResponse />}
    </AlertStripe>
  );
}

QualifiedMessage.propTypes = {
  doesPersonQualify: PropTypes.bool.isRequired,
  beløp: PropTypes.number,
  periode: PropTypes.string,
};

function PositiveResponse({ beløp, periode }) {
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

function NegativeResponse() {
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

function Minstekrav() {
  return (
    <HjelpetekstBase id="minstekrav" type="auto">
      {' '}
      Minstekravet er på 1,5
      ganger
      <Lenke
        href="https://www.nav.no/383506/grunnbel%C3%B8pet-i-folketrygden"
      >
        folketrygdens
        grunnbeløp
      </Lenke>
      {' '}
      (1,5 G) de siste 12 månedene eller 3 G de
      siste 36 månedene.
    </HjelpetekstBase>
  );
}
