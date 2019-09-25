import { Element, Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import Lenke from 'nav-frontend-lenker';

export default function PositiveResponse({ ukeSats, periodeAntalluker }) {
  const padding = {
    padding: '10px'
  }

  const textMargin = {
    marginBottom: '15px'
  }


  return (
    <div style={padding}>
      <Innholdstittel style={textMargin}>Dagpengekalkulator</Innholdstittel>
      <Normaltekst >
        I dag ville du fått omtrent:
      </Normaltekst>
      <Element style={textMargin}>
        { ukeSats } kr før skatt hver uke i { periodeAntalluker } uker
      </Element>
      <Normaltekst style={textMargin}>
        Dette gjelder kun hvis du oppfyller alle <Lenke href="http://nav.no/dagpenger"> vilkårene for å få dagpenger</Lenke>.
      </Normaltekst>
      <Normaltekst style={textMargin}>
       Vi anbefaler at du <Lenke href="https://www.nav.no/soknader/nb/person/arbeid/dagpenger">sender søknad</Lenke> én uke før du blir arbeidsledig.
      </Normaltekst>
      <Normaltekst style={textMargin}>
        Beregningen er basert på opplysninger om dine inntekter fra <Lenke href="http://skatteetaten.no/mineinntekter">skatteetaten.no/mineinntekter</Lenke>
      </Normaltekst>
    </div>
  );
}

PositiveResponse.propTypes = {
  ukeSats: PropTypes.number,
  periodeAntalluker: PropTypes.number,
};
