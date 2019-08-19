import React from 'react';
import PanelBase from 'nav-frontend-paneler';

export default function ErrorMessage() {
  return (
      <PanelBase className="Error" border>
        Vi opplevde en feil når vi prøvde å laste inn din data. Hvis feilen vedvarer kontakt nav.no.
      </PanelBase>
  );
}
