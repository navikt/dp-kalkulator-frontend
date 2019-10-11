import React, { useEffect, useState } from 'react'
import LoadingMessage from '../information/LoadingMessage';
import api from './api';
import QualifiedMessage from './responses/QualifiedMessage';

const Kalkulator = ({ addError }) => {
    const [loading, setLoading] = useState(true);
    const [oppfyllerInntekstkrav, setoppfyllerInntekstkrav] = useState(false)
    const [antallUker, setAntallUker] = useState(0)
    const [ukesats, setUkesats] = useState(0)
    const [verified, setVerified] = useState(false)

    const localPayload = {
        aktorId: process.env.REACT_APP_aktorId,
        vedtakId: process.env.REACT_APP_vedtakId,
        beregningsdato: process.env.REACT_APP_beregningsdato
    }
    const localparams = JSON.stringify(localPayload)

    useEffect(() => {
        
        if (verified) {
             api.startBehov(localparams)
            .then(transform)
            .then(setData)
            .catch(error => {
                // if error == 401 redirect
                console.log(error)
                addError(error)
            }
            ) 
            //setData({oppfyllerMinstekrav:true, periodeAntalluker:13, ukeSats:54000})
        } else {
            api.verifyToken()
                .then(setVerified(true))
                .catch(
                    setVerified(true)  // TODO: DELETE BEFORE DEPLOYMENY
                    //api.redirectToLogin()
                )
        } 
        
    }, [verified])

    const setData = (json) => {
        setoppfyllerInntekstkrav(json.oppfyllerMinstekrav);
        setAntallUker(json.periodeAntalluker);
        setUkesats(json.ukeSats);
        setLoading(false)
    };

    const transform = (data) => {
        return {
            oppfyllerMinstekrav: data.minsteinntektResultat.oppfyllerMinsteinntekt,
            periodeAntalluker: data.periodeResultat.periodeAntallUker,
            ukeSats: data.satsResultat.ukesats
        }
    }

    if (loading) {
        return <LoadingMessage />
    } else {
        return <QualifiedMessage oppfyllerInntekstkrav={oppfyllerInntekstkrav} ukesats={ukesats} periodeAntalluker={antallUker}/>
    }
}

export default Kalkulator