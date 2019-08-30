import React from "react";
import Panel from "nav-frontend-paneler";
import { Hovedknapp } from "nav-frontend-knapper";
import { Checkbox } from "nav-frontend-skjema";
import { Normaltekst } from "nav-frontend-typografi";

export default function Consent({ consent, fetchData, toggle, feilMelding }) {
    const checkedPanelStyle = {
        background: '#e0f5fb'
    }

    const uncheckedConsentPanelStyle = {
        background: '#ffe9cc'
    }

    const panelStyle = consent ? checkedPanelStyle : uncheckedConsentPanelStyle
    
    const minHeight = {
        minHeight: '80px'
    }
    const flex = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
    const maxWidth = {
        maxWidth: '600px'
    }
    const fontSize = {
        fontSize: '1.3em'
    }

    const padding = {
        padding: '10px'
    }

    const isChecked = () => {
        return (!consent && feilMelding ? { feilmelding: 'Du må samtykke for å kunne estimere' } : null)
    }

    return (
        <Panel style={{ ...panelStyle, ...maxWidth, ...flex }}>
            <div className={'row'} style={padding}>
                <div className={'col-xs-12'}>
                    <Normaltekst>
                        For at vi skal kunne estimere dagpengemulighetene dine, innhenter NAV data om inntektene dine fra skattevesenet.
                        Informasjonsutvekslingen foregår på en sikker måte, og krever ditt samtykke.
                        Hvis du ikke samtykker, kan vi ikke estimere dagpengekravet ditt.
                    </Normaltekst>
                </div>
            </div>
            <div className='row' style={{ ...padding, ...{ alignSelf: 'start' } }}>
                <Checkbox style={{ ...fontSize }} onChange={toggle} checked={consent} label={'Jeg samtykker til at NAV innhenter lønnsopplysningene mine'} feil={isChecked()} />
            </div>
            <div className={'row'}>
                <div className={'col-xs-12'}>
                    <Hovedknapp disabled={!consent} onClick={fetchData}>Estimer dagpenger</Hovedknapp>
                </div>
            </div>
        </Panel >
    );

}