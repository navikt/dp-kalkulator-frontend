import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import QualifiedMessage from './Components/QualifiedMessage';
import LoadingMessage from './Components/information/LoadingMessage';
import ErrorMessage from './Components/information/ErrorMessage';
import InntektFiltrering from "./Components/information/InntektFiltrering";
import personIncomeService from './services/PersonIncome'

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("")
  const [doesPersonQualify, setDoesPersonQualify] = useState(false)
  const [periodeAntalluker, setPeriodeAntallUker] = useState(0)
  const [ukesats, setUkesats] = useState(0.0)

  const fetchData = async () => {
    try {
      const response = await personIncomeService.get()
      setData(response)
      setLoading(false)
    } catch (e) {
      console.log(e.message)
      setError(e.message)
      setLoading(false)
    }
  }

  const setData = (json) => {
    setDoesPersonQualify(json.oppfyllerMinstekrav);
    setPeriodeAntallUker(json.periodeAntalluker)
    setUkesats(json.ukeSats)
  }

  useEffect(() => {
    fetchData()
  }, [])

 /* useEffect(() => {
    personIncomeService.get()
      .then(personIncomeInformation => {
        let contentType = personIncomeInformation.headers.get("content-type")
        if(contentType && contentType.includes("application/json"))
        {
          let json = personIncomeInformation.json()
          if (personIncomeInformation.ok) {
            setDoesPersonQualify(json.oppfyllerMinstekrav)
            setPeriodeAntallUker(json.periodeAntalluker)
            setUkesats(json.ukeSats)
            setTotalIncome36(json.totalIncome36)
            setTotalIncome12(json.totalIncome12)
            setMonthsIncomeInformation(json.monthsIncomeInformation)
            setEmployerSummaries(json.employerSummaries)
            setPeriodIncome(json.periodIncome)
          }
          else {
            let errorResponse = json.toJSON()
            console.log("json = " + errorResponse.status)
            console.log(json)
            console.log(errorResponse)
            setErrorMessage(errorResponse.title)
            console.log("errormessage = " + errorResponse)
            setError(true)
          }

          setLoading(false);
        }
        else {
          throw Error("En feil uten feilmelding oppstod");
        }
      })
      .catch(e => {
        setLoading(false)
        setError(true)
      })
  }, [])*/

  let feedback;
  if (loading) { feedback = (<LoadingMessage />); }
  else if (error) {
    feedback = <ErrorMessage message={error} />
    console.log(errorMessage)
  }
  else {
    feedback =
        <>
        <InntektFiltrering/>
        <QualifiedMessage doesPersonQualify={doesPersonQualify} ukeSats={ukesats} periodeAntalluker={periodeAntalluker} />
        </>;
  }


  return (
    <div className="App">
      <Header loading={loading} />
      { feedback }
    </div>
  );
}

export default App;
