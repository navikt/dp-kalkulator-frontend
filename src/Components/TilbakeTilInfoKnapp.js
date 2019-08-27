import React from 'react';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper'
import { NONAME } from 'dns';

export default function TilbakeTilInfoKnapp() {
    return (
        <a href="http://nav.no/dagpenger" style={{color: 'none', textDecoration: 'none'}}>
            <Tilbakeknapp mini={true}>Tilbake til info om dagpenger</Tilbakeknapp>
        </a>
    )
}