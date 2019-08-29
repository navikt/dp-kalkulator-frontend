import React from "react";
import Panel from "nav-frontend-paneler";
import {Hovedknapp} from "nav-frontend-knapper";
import {Checkbox} from "nav-frontend-skjema";
import {Normaltekst} from "nav-frontend-typografi";

export default function Consent({consent, fetchData, toggle, feilMelding}) {
    const panelStyle = {
        background: '#e0f5fb'

    }
    const minHeight = {
        minHeight: '100px'
    }
    const fontSize = {
        fontSize: '1.3em'
    }
    const centered = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
    const margin = {
        margin: '5px',
    }

    const padding = {
        padding: '5px'
    }

    const isChecked = () => {
        return(!consent && feilMelding ? {feilmelding: 'Du må samtykke for å kunne estimere'} : null)
    }

    return (
        <Panel style={panelStyle}>
            <div className={'row'}>
                <div className={'col-xs-12'}>
                    <Normaltekst>
                        For at vi skal kunne estimere dagpengemulighetene dine, innhenter NAV data om inntektene dine fra skattevesenet.
                        Informasjonsutvekslingen foregår på en sikker måte, og krever ditt samtykke.
                        Hvis du ikke samtykker, kan vi ikke estimere dagpengekravet ditt.
                    </Normaltekst>
                </div>
            </div>
            <div className={'row'}>
                <div style={{...minHeight, ...centered, ...padding}} className={'col-xs-12'}>
                    <Checkbox style={{...fontSize}} onChange={toggle} checked={consent} label={'Jeg samtykker til at NAV innhenter lønnsopplysningene mine'} feil={isChecked()}/>
                </div>
            </div>
            <div className={'row'}>
                <div className={'col-xs-12'} style={{...centered, ...margin}}>
                    <Hovedknapp onClick={fetchData}>Estimer dagpenger</Hovedknapp>
                </div>
            </div>
        </Panel>
    );

}