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
import PersonIncomeService from './services/PersonIncome'

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [doesPersonQualify, setDoesPersonQualify] = useState(false)
  const [periodeAntalluker, setPeriodeAntallUker] = useState()
  const [ukesats, setUkesats] = useState(0.0)
  const [totalIncome36, setTotalIncome36] = useState(0.0)
  const [totalIncome12, setTotalIncome12] = useState(0.0)
  const [monthsIncomeInformation, setMonthsIncomeInformation] = useState([])
  const [employerSummaries, setEmployerSummaries] = useState([])
  const [periodIncome, setPeriodIncome] = useState([])
 
  useEffect(() => {
    PersonIncomeService.get()
      .then(personIncomeInformation => {
        if (personIncomeInformation.ok) {
          return personIncomeInformation.json()
        }
        throw Error(personIncomeInformation.statusText);
      })
      .then(json => {
        setLoading(false);
        setDoesPersonQualify(json.oppfyllerMinstekrav);
        setPeriodeAntallUker(json.periodeAntalluker)
        setUkesats(json.ukeSats)
        setTotalIncome36(json.totalIncome36)
        setTotalIncome12(json.totalIncome12)
        setMonthsIncomeInformation(json.monthsIncomeInformation)
        setEmployerSummaries(json.employerSummaries)
        setPeriodIncome(json.periodIncome)
      })  
      .catch(e => {
        console.log(e)
        setLoading(false)
        setError(true)
      })
}, [])

   

    if (loading) { return (<LoadingMessage />); }
    if (error) { return (<ErrorMessage />); }
    
    if (monthsIncomeInformation.length === 0) { return (<NoIncome doesPersonQualify={doesPersonQualify} />); }
    try {
      return (
        <div className="App">
          <Header loading={false} />
          <InntektFiltrering />
          <QualifiedMessage doesPersonQualify={doesPersonQualify} ukeSats={ukesats} periodeAntalluker={periodeAntalluker} />
          <IncomeSummary totalIncome36={totalIncome36} totalIncome12={totalIncome12} />
          <IncomeInPeriodList periodIncome={periodIncome} />
          <RapporteringInfo />
          <InformationSummary employerSummaries={employerSummaries} monthsIncomeInformation={monthsIncomeInformation} />
        </div>
      );
    } catch (err) { return (<ErrorMessage />); }
}


export default App;
