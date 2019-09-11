import React from 'react'

const Feilmelding = ({errors}) => {
    if (errors.length > 0) {
        return (<p>FEIL</p>)
    } else {
        return null
    }
}

export default Feilmelding