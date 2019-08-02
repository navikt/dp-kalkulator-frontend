import React from 'react';
import './App.css';
import { Sidetittel } from 'nav-frontend-typografi';
import QualifiedMessage from './Components/QualifiedMessage';
import InformationSummary from './Components/InformationSummary';
import LoadingMessage from './Components/LoadingMessage';
import IncomeSummary from './Components/IncomeSummary';
import RapporteringInfo from './Components/RapporteringInfo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalIncome36: null,
      totalIncome12: null,
      beløp: null,
      employerSummaries: null,
      monthsIncomeInformation: null,
      doesPersonQualify: true,
      loading: true,
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
        if (personIncomeInformation.ok) {
          return personIncomeInformation.json();
        }
        throw Error(personIncomeInformation.statusText);
      })
      .then((json) => {
        this.setState({
          loading: false,
          totalIncome36: json.totalIncome36,
          totalIncome12: json.totalIncome12,
          monthsIncomeInformation: json.monthsIncomeInformation,
          employerSummaries: json.employerSummaries,
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return (
        <LoadingMessage />
      );
    }
    const { totalIncome36 } = this.state;
    const { totalIncome12 } = this.state;
    const { doesPersonQualify } = this.state;
    const { employerSummaries } = this.state;
    const { monthsIncomeInformation } = this.state;
    const { beløp } = this.state;
    return (
      <div className="App">
        <div className="header">
          <img src="https://www.nav.no/_public/beta.nav.no/images/logo.png?_ts=1512923c9b0" alt="NAV-logo-rød-trans-bg-200.png" />
          <Sidetittel>Din inntekt</Sidetittel>
        </div>
        <br />
        <br />
        <IncomeSummary totalIncome36={totalIncome36} totalIncome12={totalIncome12} />
        <QualifiedMessage doesPersonQualify={doesPersonQualify} beløp={beløp} />
        <RapporteringInfo />
        <br />
        <InformationSummary employerSummaries={employerSummaries} monthsIncomeInformation={monthsIncomeInformation} />
      </div>
    );
  }
}

export default App;
