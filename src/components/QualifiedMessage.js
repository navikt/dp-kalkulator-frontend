import AlertStripe from "nav-frontend-alertstriper";
import React from "react";
import HjelpetekstBase from "nav-frontend-hjelpetekst";
import Lenke from "nav-frontend-lenker";
import {Normaltekst} from "nav-frontend-typografi";

export function QualifiedMessage(props) {
  return (
      <AlertStripe type={props.doesPersonQualify ? "suksess" : "advarsel"}>
        {props.doesPersonQualify ? <PositiveResponse/> : <NegativeResponse/>}
      </AlertStripe>
  );
}

function PositiveResponse() {
  return (
      <div>
        <Normaltekst>
          <h3> Ifølge a-ordningen har du tjent over minstekravet for å ha rett
            på dagpenger<HjelpetekstBase type={"auto"}> Minstekravet er på 1,5
              ganger <Lenke
                  href="https://www.nav.no/383506/grunnbel%C3%B8pet-i-folketrygden">folketrygdens
                grunnbeløp</Lenke> (1,5 G) de siste 12 månedene eller 3 G de
              siste 36 månedene.</HjelpetekstBase></h3>


          <b>Får du likevel avslag på grunn av for lav inntekt, kan det være
            fordi:</b>
          <ul className= "a">
            <li>Inntektene har blitt brukt opp i en tidligere dagpengeperiode.
            </li>
            <li>Du får innvilget dagpenger fra en dato fram i tid. Da vil
              inntekter beregnes fra kravsdato.
            </li>
            <li>Opplysningene i a-ordningen er feil.</li>
            <li>Noen av inntektene teller med, men vises ikke i a-ordningen...?
              Usikker på om: folketrygdytelsene foreldrepenger,
              svangerskapspenger og svangerskapsrelaterte sykepenge
            </li>
            <li>Inntekter som selvstenig næringsdrivende?</li>
          </ul>

          <b>Vi anbefaler at du sender en søknad om dagpenger selv hvis du er
            usikker på om du har tjent nok, så kan en saksbehandler vurdere
            dette.</b>
        </Normaltekst>
      </div>
  );
}

function NegativeResponse() {
  return (
      <div>
        <h4> Ifølge a-ordningen har du tjent under minstekravet for å ha rett på
          dagpenger.<HjelpetekstBase type={"auto"}>Minstekravet er på 1,5
            ganger <Lenke
                href="https://www.nav.no/383506/grunnbel%C3%B8pet-i-folketrygden">folketrygdens
              grunnbeløp</Lenke> (1,5 G) de siste 12 månedene eller 3 G de siste
            36 månedene.</HjelpetekstBase></h4>

        <b>Du kan likevel ha tjent nok til å ha rett på dagpenger hvis:</b>
        <ul className = "a">
          <li>Du har hatt verneplikt.</li>
          <li>Du får innvilget dagpenger fra en dato fram i tid.</li>
          <li>Du har hatt arbeid i et annet EØS-land.</li>
          <li>Opplysningene i a-ordningen er feil.</li>
        </ul>
        <b>Vi anbefaler at du sender en søknad om dagpenger selv hvis du er
          usikker på om du har tjent nok, så kan en saksbehandler vurdere
          dette.</b>
      </div>
  );
}