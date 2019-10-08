import React, { useEffect, useState } from 'react'
import { Knapp } from 'nav-frontend-knapper'
import i18n from '../../../i18n'

const Sprakvelger = () => {

    const handleClickEN = () => {
        i18n.changeLanguage("en")
        console.log("handleClickEN")
        }

    const handleClickNB = () => {
        i18n.changeLanguage("nb")
        }

    return <div>
        <Knapp form="kompakt" onClick = {handleClickEN}>
        <span>EN</span>

       </Knapp>
        <Knapp form="kompakt" onClick = {handleClickNB}>
        <span>NB</span>

        </Knapp>
    </div>
} 
export default Sprakvelger
