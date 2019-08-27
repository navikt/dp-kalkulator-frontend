import React from 'react';
import PanelBase from 'nav-frontend-paneler';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst } from 'nav-frontend-typografi';

export default function LoadingMessage() {
  const style = {
    display: 'flex',
    justifyContent: 'center',
    lineHeight: '1.7em',
    paddingBottom: '3px'
  }

  return (
      <PanelBase border >
        <div style={style}>
          <NavFrontendSpinner />
        </div>
        <Normaltekst style={style}>
        Vi laster nå inn informasjonen vi har om dine inntekter som danner grunnlaget for vurderingen om dagpenger.
        <br/>
        Vennligst vent opp til 2 minutter før du laster inn siden på nytt.
        </Normaltekst>
       
      </PanelBase>
  );
}
