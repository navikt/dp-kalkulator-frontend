import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import QualifiedMessage from './Components/QualifiedMessage';
import InformationSummary from './Components/InformationSummary';
import LoadingMessage from './Components/information/LoadingMessage';
import ErrorMessage from './Components/information/ErrorMessage';
import IncomeSummary from './Components/income/IncomeSummary';
import RapporteringInfo from './Components/information/RapporteringInfo';
import NoIncome from './Components/NoIncome';
import IncomeInPeriodList from './Components/periode-list/IncomeInPeriodList';
import InntektFiltrering from "./Components/information/InntektFiltrering";
import personIncomeService from './services/PersonIncome'

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [doesPersonQualify, setDoesPersonQualify] = useState(false)
  const [periodeAntalluker, setPeriodeAntallUker] = useState(0)
  const [ukesats, setUkesats] = useState(0.0)
  const [totalIncome36, setTotalIncome36] = useState(0.0)
  const [totalIncome12, setTotalIncome12] = useState(0.0)
  const [monthsIncomeInformation, setMonthsIncomeInformation] = useState([])
  const [employerSummaries, setEmployerSummaries] = useState([])
  const [periodIncome, setPeriodIncome] = useState([])

  useEffect(() => {
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
  }, [])

  let feedback;
  if (loading) { feedback = (<LoadingMessage />); }
  else if (error) {
    feedback = <ErrorMessage />
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
