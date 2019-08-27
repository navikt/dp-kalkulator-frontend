import { Element, Normaltekst } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import Minstekrav from './Minstekrav';
import Lenke from 'nav-frontend-lenker';

export default function PositiveResponse({ ukeSats, periodeAntalluker }) {
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
      <Normaltekst style={{fontSize: '1.3em'}}>
        Søker du om dagpenger fra i dag estimerer vi at du kunne fått
      </Normaltekst>
      <Element style={{...tekstPadding, ...fontSize}}>
        { ukeSats } kr hver uke i { periodeAntalluker } uker
      </Element>
      <Normaltekst style={tekstPadding}>
        Beløp oppgitt før skatt
      </Normaltekst>
      <Normaltekst style={tekstPadding}>
        Vi tar forbehold om at du oppfyller <Lenke href="http://nav.no/dagpenger"> vilkårene for å få dagpenger</Lenke> 
      </Normaltekst>
    </div>
  );
}

PositiveResponse.propTypes = {
  ukeSats: PropTypes.number,
  periodeAntalluker: PropTypes.string,
};
