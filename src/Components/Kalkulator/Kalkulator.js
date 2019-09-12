import React, { useEffect, useState } from 'react'
import LoadingMessage from '../information/LoadingMessage';
import api from './api';
import QualifiedMessage from '../QualifiedMessage';

const Kalkulator = ({ addError }) => {
    const [loading, setLoading] = useState(false);
    const [personQualified, setPersonQualified] = useState(false)
    const [antallUker, setAntallUker] = useState('')
    const [ukesats, setUkesats] = useState(0)

    useEffect(() => {
        const localPayload = {
            aktorId: process.env.REACT_APP_aktorId,
            vedtakId: process.env.REACT_APP_vedtakId,
            beregningsdato: process.env.REACT_APP_beregningsdato
        }
        const localparams = JSON.stringify(localPayload)

        api.startBehov(localparams)
        .then(console.log)
            .then(transform)
            .then(setData)
            .catch(error => {
                console.log(error)
                addError(error)
            }
            )
    }, [])


    const setData = (json) => {
        setPersonQualified(json.oppfyllerMinstekrav);
        setAntallUker(json.periodeAntalluker);
        setUkesats(json.ukeSats);
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
        return <QualifiedMessage doesPersonQualify={personQualified} ukeSats={ukesats} periodeAntalluker={antallUker}/>
    }
}

export default Kalkulator