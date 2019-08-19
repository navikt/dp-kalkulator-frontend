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
  const [doesPersonQualify, setDoesPersonQualify] = useState(false)
  const [periodeAntalluker, setPeriodeAntallUker] = useState(0)
  const [ukesats, setUkesats] = useState(0.0)

  const fetchData = async () => {
    try {
      const response = await personIncomeService.get()
      setData(response)
      setLoading(false)
    } catch (e) {
      setError(true)
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

  if (error != null) { return (<ErrorMessage />); }
  if (loading) { return (<LoadingMessage />); }

  return (
    <div className="App">
      <Header loading={false} />
      <InntektFiltrering />
      <QualifiedMessage doesPersonQualify={doesPersonQualify} ukeSats={ukesats} periodeAntalluker={periodeAntalluker} />
    </div>
  );
}

export default App;
