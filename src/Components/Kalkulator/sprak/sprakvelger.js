import React, { useState, useRef, useEffect } from 'react'
import { Knapp } from 'nav-frontend-knapper'
import i18n from '../../../i18n'


// TODO:
// Fix so that buttons lose focus/hover?
// design.nav.knapp has a button outline/background when active&focused we dont want
const Sprakvelger = () => {
    const [ enButton, setEnButton ]  = useState("standard")
    const [ nbButton, setNbButton ] = useState("standard")
    const unFocus = useRef(null)

    useEffect(() => {
        unFocus.current.focus()
        console.log("current focus is: " + unFocus.current)
    }, [enButton, nbButton]);

    const handleClickEN = () => {
        setEnButton("hoved")
        setNbButton("standard")
        unFocus.current.focus()
        i18n.changeLanguage("en")
        }

    const handleClickNB = () => {
        i18n.changeLanguage("nb")
        setEnButton("standard")
        setNbButton("hoved")
        unFocus.current.focus()
        }
    

    return <div ref={unFocus}>
        <Knapp form="kompakt" onClick = {handleClickEN} type={enButton} htmlType="button">
        <span>EN</span>

       </Knapp>
        <Knapp form="kompakt" onClick = {handleClickNB} type={nbButton} htmlType="button">
        <span>NB</span>
        </Knapp>
    </div>
} 
export default Sprakvelger
