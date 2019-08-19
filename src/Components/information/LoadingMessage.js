import React from 'react';
import PanelBase from 'nav-frontend-paneler';
import Header from '../Header';

export default function LoadingMessage() {
  return (
      <PanelBase border>
        Vi laster nå inn informasjonen vi har om dine inntekter som danner grunnlaget for vurderingen om dagpenger.
        <br />
        Vennligst vent opp til 2 minutter før du laster inn siden på nytt.
      </PanelBase>
  );
}
