import React, { useState } from "react";
import Panel from "nav-frontend-paneler";
import { Hovedknapp } from "nav-frontend-knapper";
import { Checkbox } from "nav-frontend-skjema";
import { Normaltekst, Innholdstittel } from "nav-frontend-typografi";
import { redirectToLogin } from '../Authentication/Api'

export default function Consent({ consent, onClick, hjelpeTekst }) {
    const [checked, setChecked] = useState(consent)

    const checkedPanelStyle = {
        background: '#e0f5fb'
    }

    const uncheckedConsentPanelStyle = {
        background: '#ffe9cc'
    }

    const panelStyle = checked ? checkedPanelStyle : uncheckedConsentPanelStyle

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
        return (!checked && hjelpeTekst ? { feilmelding: 'Du må samtykke for å kunne estimere' } : null)
    }




    return (
        <Panel className='fadeable' style={{ ...panelStyle, ...maxWidth, ...flex }}>
            <div className={'row'} style={padding}>
                <div className={'col-xs-12'}>
                    <Innholdstittel>Vi trenger informasjon fra Skatteetaten </Innholdstittel>
                    <br />
                    <Normaltekst>
                        Vi bruker opplysninger om dine inntekter fra Skatteetaten for å beregne omtrent hvor mye du kan få i dagpenger.
                    </Normaltekst>
                </div>
            </div>
            <div className='row' style={{ ...padding, ...{ alignSelf: 'start' } }}>
                <Checkbox style={{ ...fontSize }} onChange={() => setChecked(!checked)} checked={checked} label={'Jeg samtykker til at NAV innhenter inntektsopplysningene mine fra Skatteetaten og lagrer dem i inntil én time'} feil={isChecked()} />
            </div>
            <div className={'row'}>
                <div className={'col-xs-12'}>
                    <Hovedknapp onClick={() => redirectToLogin()}>log in</Hovedknapp>
                    <Hovedknapp disabled={!checked} onClick={() => onClick(checked)}>Estimer dagpenger</Hovedknapp>
                </div>
            </div>
        </Panel >
    );

}