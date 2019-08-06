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
          totalIncome36: json.totalIncome36,
          totalIncome12: json.totalIncome12,
          monthsIncomeInformation: json.monthsIncomeInformation,
          employerSummaries: json.employerSummaries,
        });
      })
      .catch(() => { this.setState({ error: true }); });
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
    const { beløp } = this.state;
    if (monthsIncomeInformation.length === 0 && !doesPersonQualify) { return (<NoIncome />); }
    try {
      return (
        <div className="App">
          <Header loading={false} />
          <IncomeSummary totalIncome36={totalIncome36} totalIncome12={totalIncome12} />
          <QualifiedMessage doesPersonQualify={doesPersonQualify} beløp={beløp} />
          <RapporteringInfo />
          <br />
          <InformationSummary employerSummaries={employerSummaries} monthsIncomeInformation={monthsIncomeInformation} />
        </div>
      );
    } catch (err) { return (<ErrorMessage />); }
  }
}

export default App;
