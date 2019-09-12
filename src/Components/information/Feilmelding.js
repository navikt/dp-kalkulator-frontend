import React from 'react'
import { AlertStripeFeil } from 'nav-frontend-alertstriper';


const Feilmelding = ({errors, click}) => {
    if (errors.length > 0) {
        return errors.map((e, index) =>
            <AlertStripeFeil key={index} onClick={() => click({index})}>{e.message}</AlertStripeFeil>
        )
    } else {
        return null
    }
}

export default Feilmelding