import React from 'react';
import PanelBase from 'nav-frontend-paneler';
import Header from '../Header';

export default function ErrorMessage() {
  return (
    <div className="App">
      <Header loading={false} />
      <PanelBase border>
        Vi opplevde en feil når vi prøvde å laste inn din data. Hvis feilen vedvarer kontakt nav.no.
      </PanelBase>
    </div>
  );
}
