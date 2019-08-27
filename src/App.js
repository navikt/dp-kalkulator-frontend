import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import QualifiedMessage from './Components/QualifiedMessage';
import LoadingMessage from './Components/information/LoadingMessage';
import ErrorMessage from './Components/information/ErrorMessage';
import personIncomeService from './services/PersonIncome'
import TilbakeTilInfoKnapp from './Components/TilbakeTilInfoKnapp'


const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorObject, setErrorObject] = useState([])
  const [doesPersonQualify, setDoesPersonQualify] = useState(false)
  const [periodeAntalluker, setPeriodeAntallUker] = useState(0)
  const [ukesats, setUkesats] = useState(0.0)






  useEffect(() => {
    const urlAPI = '/api/inntekt/'
    const urlMock = `${process.env.PUBLIC_URL}/mock/mockInnsyn.json`

    const fetchData = (url) => {
      personIncomeService.get(url)
          .then(personIncomeInformation => {
            console.log(personIncomeInformation)
            setData(personIncomeInformation)
            setLoading(false);
          })
          .catch(e => {
            let error = e.response
            setErrorObject({data: error.data, status: error.status, statusText: error.statusText})
            setLoading(false)
            setError(true)
          })
    }

    const setData = (json) => {
      setDoesPersonQualify(json.oppfyllerMinstekrav);
      setPeriodeAntallUker(json.periodeAntalluker)
      setUkesats(json.ukeSats)
    }

    if (process.env.NODE_ENV === 'production')
    {
      fetchData(urlAPI);
    }
    else {
      fetchData(urlMock);
    }

  }, [])

  let feedback;
  if (loading) { feedback = (<LoadingMessage />); }
  else if (error) {
    feedback = <ErrorMessage error={errorObject}/>
  }
  else {
    feedback =
        <QualifiedMessage doesPersonQualify={doesPersonQualify} ukeSats={ukesats} periodeAntalluker={periodeAntalluker} />
  }


  return (
    <div className="App">
      <Header loading={loading} />
      <TilbakeTilInfoKnapp/>
      { feedback }
      <TilbakeTilInfoKnapp/>
    </div>
  );
}

export default App;
