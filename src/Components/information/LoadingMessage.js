import React from 'react';
import PanelBase from 'nav-frontend-paneler';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst } from 'nav-frontend-typografi';

export default function LoadingMessage() {
  const style = {
    display: 'flex',
    flexDirection: 'column',
  }

  return (
    <PanelBase style={style}>
      <NavFrontendSpinner style={{alignSelf: 'center'}} />
      <Normaltekst>
        Vi laster nå inn informasjonen vi har om dine inntekter som danner grunnlaget for vurderingen om dagpenger.
        </Normaltekst>
      <Normaltekst>
        Vennligst vent opp til 2 minutter før du laster inn siden på nytt.
      </Normaltekst>
    </PanelBase>
  );
}
