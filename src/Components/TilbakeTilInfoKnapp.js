import React from 'react';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';

export default function TilbakeTilInfoKnapp() {
  return (
    <a href="http://nav.no/dagpenger" style={{ color: 'none', textDecoration: 'none' }}>
      <Tilbakeknapp mini>Tilbake til informasjon om dagpenger</Tilbakeknapp>
    </a>
  );
}
