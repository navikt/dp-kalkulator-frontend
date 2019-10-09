import React from "react";
import Panel from "nav-frontend-paneler";
import { Knapp } from "nav-frontend-knapper";
import { useTranslation } from 'react-i18next';
import { Normaltekst, Innholdstittel } from "nav-frontend-typografi";

function Consent({ onClick}) {
    const { t, i18n } = useTranslation()
    const panelBackground = {
        background: '#fff'
    }

    const flex = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }

    const maxWidth = {
        maxWidth: '600px'
    }

    const padding = {
        padding: '10px'
    }

    const headerMargin = {
        marginBottom: '15px'
    }

    return (
        <Panel style={{ ...panelBackground, ...maxWidth, ...flex }}>
            <div style={padding}>
                <Innholdstittel style={headerMargin}>{t("consent_innholdstittel")} </Innholdstittel>
                <Normaltekst style={headerMargin}>
                    {t("consent_skattetinfo")}
                </Normaltekst>
            </div>
            <Knapp onClick={onClick}>{t("consent_knapp")}</Knapp>
        </Panel >
    );

}
export default (Consent)