import React from 'react';
import './App.css';
import PanelBase from 'nav-frontend-paneler';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import QualifiedMessage from './Components/QualifiedMessage';
import TotalInntekt from './Components/TotalInntekt';
import EmployerList from './Components/employer-list/EmployerList';
import AllYears from './Components/all-years/AllYears';
import LoadingMessage from './Components/LoadingMessage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalIncome36: null,
      totalIncome12: null,
      employerSummaries: null,
      monthsIncomeInformation: null,
      doesPersonQualify: false,
      loading: true,
    };
  }

  componentDidMount() {
    document.cookie = 'nav-esso=2416281490ghj';
    document.cookie = `beregningsdato=${((new Date()).toISOString().split('T')[0])}`;
    document.cookie = 'domain=.myapp.com';
    this.setState({
      loading: true,
    });
    fetch('http://backend.myapp.com:8099/inntekt', {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
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
    return (
      <div className="App">
        <img src="https://www.nav.no/_public/beta.nav.no/images/logo.png?_ts=1512923c9b0" alt="NAV-logo-rød-trans-bg-200.png" />

        <Sidetittel>
Din inntekt
          {' '}

        </Sidetittel>
        <div>
          <b>Her vises opplysninger om dine inntekter hentet fra a-ordningen.</b>
          <br />
          <b>Rett på dagpenger baserer seg enten på inntekter siste 36 måneder eller inntekter siste 12 måneder</b>
          <ul className="a">
            {totalIncome36 == null ? <br /> : <TotalInntekt totalIncome={totalIncome36} months={36} />}
            {totalIncome12 == null ? <br /> : <TotalInntekt totalIncome={totalIncome12} months={12} />}
          </ul>
        </div>
        <QualifiedMessage doesPersonQualify={doesPersonQualify} />
        <Normaltekst>
          <br />
Din arbeidsgiver og andre som utbetaler inntekter til deg rapporterer disse opplysningene til a-ordningen minst én gang i måneden.
          <br />
          Oppdager du feil? Ta kontakt med de som har rapportert opplysningene.
        </Normaltekst>
        <br />
        <PanelBase border>
          {employerSummaries === null ? <br />
            : (
              <EmployerList
                employerSummaries={employerSummaries}
              />
            )}
          {monthsIncomeInformation === null ? <br />
            : (
              <AllYears
                monthsIncomeInformation={monthsIncomeInformation}
              />
            )}
        </PanelBase>

      </div>
    );
  }
}

export default App;
