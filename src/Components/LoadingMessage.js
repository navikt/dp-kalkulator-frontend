import React from 'react';
import PanelBase from 'nav-frontend-paneler';
import NavFrontendSpinner from 'nav-frontend-spinner';

export default function LoadingMessage() {
  return (
    <div className="App">
      <img src="https://www.nav.no/_public/beta.nav.no/images/logo.png?_ts=1512923c9b0" alt="NAV-logo-rød-trans-bg-200.png" />
      <NavFrontendSpinner />
      <PanelBase border>
        Vi laster nå inn informasjonen vi har om dine inntekter som danner grunnlaget for vurderingen om dagpenger.
        <br />
        Vennligst vent opp til 2 minutter før du laster inn siden på nytt.
      </PanelBase>
    </div>
  );
}
