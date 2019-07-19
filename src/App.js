import React from 'react';
import './App.css';
import PanelBase from 'nav-frontend-paneler';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import QualifiedMessage from './Components/QualifiedMessage';
import TotalInntekt from './Components/TotalInntekt';
import EmployerList from './Components/EmployerList';
import AllYears from './Components/AllYears';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalIncome: null,
      totalIncome12: null,
      employerSummaries: null,
      monthsIncomeInformation: null,
      doesPersonQualify: false,
    };
  }

  componentDidMount() {
    document.cookie = 'nav-esso=2416281490ghj';
    document.cookie = `beregningsdato=${((new Date()).toISOString().split('T')[0])}`;
    document.cookie = 'domain=.myapp.com';
    this.setState({
      loading: true,
    });
    fetch('http://app.lvh.me:8099/inntekt', {
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
          totalIncome: json.totalIncome,
          totalIncome12: json.totalIncome12,
          monthsIncomeInformation: json.monthsIncomeInformation,
          employerSummaries: json.employerSummaries,
        });
      })
      .catch(error => console.error(error));

  }

  render() {
    return (
      <div className="App">
        <img src="https://www.nav.no/_public/beta.nav.no/images/logo.png?_ts=1512923c9b0" alt="NAV-logo-rød-trans-bg-200.png" />

        <Sidetittel>
Din inntekt
          {this.state.loading ? <NavFrontendSpinner /> : <br />}
          {' '}

        </Sidetittel>
        <div>
          <b>Her vises opplysninger om dine inntekter hentet fra a-ordnigen.</b>
          <ul className="a">
          {this.state.totalIncome === null ? <br /> : <TotalInntekt totalIncome={this.state.totalIncome} months={36} />}
          {this.state.totalIncome12 === null ? <br /> : <TotalInntekt totalIncome={this.state.totalIncome12} months={12} />}
          </ul>
          </div>
        <QualifiedMessage doesPersonQualify={this.state.doesPersonQualify} />
        <Normaltekst>
          <br/>
Din arbeidsgiver og andre som utbetaler inntekter til deg rapporterer disse opplysningene til a-ordningen minst én gang i måneden.
          Oppdager du feil? Ta kontakt med de som har rapportert opplysningene.
        </Normaltekst>
        <br/>
        <PanelBase border>
          {this.state.employerSummaries === null ? <br />
            : (
              <EmployerList
                employerSummaries={this.state.employerSummaries}
              />
            )}
          {this.state.monthsIncomeInformation === null ? <br />
            : (
              <AllYears
                monthsIncomeInformation={this.state.monthsIncomeInformation}
              />
            )}
        </PanelBase>

      </div>
    );
  }
}

export default App;
