import HjelpetekstBase from 'nav-frontend-hjelpetekst';
import Lenke from 'nav-frontend-lenker';
import React from 'react';

export default function Minstekrav() {
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
