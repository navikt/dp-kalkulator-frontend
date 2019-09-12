import React from 'react'

const Feilmelding = ({errors}) => {
    if (errors.length > 0) {
        return errors.map((e, index) => <p key={index}>{e.message}</p>)
    } else {
        return null
    }
}

export default Feilmelding