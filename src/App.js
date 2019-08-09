import React from 'react';
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
import InntektFiltrering from './Components/information/InntektFiltrering';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
    fetch('/api/inntekt', {
      method: 'GET',
      mode: 'same-origin',
      cache: 'no-cache',
      credentials: 'same-origin',
    })

      .then((personIncomeInformation) => {
        if (personIncomeInformation.ok) { return personIncomeInformation.json(); }
        throw Error(personIncomeInformation.statusText);
      })
      .then((json) => {
        this.setState({
          loading: false,
          doesPersonQualify: json.oppfyllerMinstekrav,
          periodeAntalluker: json.periodeAntalluker,
          ukeSats: json.ukeSats,
          totalIncome36: json.totalIncome36,
          totalIncome12: json.totalIncome12,
          monthsIncomeInformation: json.monthsIncomeInformation,
          employerSummaries: json.employerSummaries,
          periodIncome: json.periodIncome,
        });
      })
      .catch(() => {
        this.setState(
          { error: true, loading: false },
        );
      });
  }

  render() {
    const { loading } = this.state;
    const { error } = this.state;
    if (loading) { return (<LoadingMessage />); }
    if (error) { return (<ErrorMessage />); }
    const { totalIncome36 } = this.state;
    const { totalIncome12 } = this.state;
    const { doesPersonQualify } = this.state;
    const { employerSummaries } = this.state;
    const { monthsIncomeInformation } = this.state;
    const { ukeSats } = this.state;
    const { periodeAntalluker } = this.state;
    const { periodIncome } = this.state;
    if (monthsIncomeInformation.length === 0) { return (<NoIncome doesPersonQualify={doesPersonQualify} />); }
    try {
      return (
        <div className="App">
          <Header loading={false} />
          <InntektFiltrering />
          <QualifiedMessage doesPersonQualify={doesPersonQualify} ukeSats={ukeSats} periodeAntalluker={periodeAntalluker} />
          <IncomeSummary totalIncome36={totalIncome36} totalIncome12={totalIncome12} />
          <IncomeInPeriodList periodIncome={periodIncome} />
          <RapporteringInfo />
          <InformationSummary employerSummaries={employerSummaries} monthsIncomeInformation={monthsIncomeInformation} />
        </div>
      );
    } catch (err) { return (<ErrorMessage />); }
  }
}

export default App;
