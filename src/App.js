import React from 'react';
import './App.css';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import PanelBase from 'nav-frontend-paneler';
import { Sidetittel, Normaltekst, Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import AlertStripe from 'nav-frontend-alertstriper';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalIncome: null,
      employerSummaries: null,
      monthsIncomeInformation: null,
      doesPersonQualify: false
    };
  }

  render() {
    return (
        <div className="App">
            <Sidetittel>Din inntekt {this.state.loading ? <NavFrontendSpinner></NavFrontendSpinner> : <br/>} </Sidetittel>
            <QualifiedMessage doesPersonQualify={this.state.doesPersonQualify}></QualifiedMessage>
            {this.state.totalIncome === null ? <br/> : <TotalInntekt totalIncome={this.state.totalIncome}/>}
            <Normaltekst>Stemmer ikke noen av opplysningene? Meld fra hos sherveer@nav.no.</Normaltekst>
            
            <PanelBase border>
                {this.state.employerSummaries === null ? <br/> :
                    <EmployerList
                        employerSummaries={this.state.employerSummaries}/>}
                {this.state.monthsIncomeInformation === null ? <br/> :
                    <AllMonths
                        monthsIncomeInformation={this.state.monthsIncomeInformation}/>}
            </PanelBase>
        </div>
    );
  }

  componentDidMount() {
    const personnummer = getQueryVariable("personnummer",
        window.location.pathname);
    console.log(personnummer);
    this.setState({
      personnummer: personnummer,
      loading: true
    });
    const json = '{"totalIncome":"1858201","employerSummaries":[{"name":"NAV","orgID":"144132","income":"1858201","startMonth":"2019-07","endMonth":"2019-07"}],"monthsIncomeInformation":[{"month":"2019-07","employers":[{"name":"NAV","orgID":"144132","income":"58.32"}]}]}';
    const obj = JSON.parse(json);
    this.setState({
      monthsIncomeInformation: obj.monthsIncomeInformation,
      totalIncome: obj.totalIncome,
      employerSummaries: obj.employerSummaries
    });
    const personObject = '{'
        + '"personnummer" :"' + personnummer
        + '"}';
    const fetchRequest = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: personObject
    };
    fetch("http://127.0.0.1:8080/inntekt", fetchRequest)
    .then(personIncomeInformation => {
      if (personIncomeInformation.ok) {
        return personIncomeInformation.json();
      } else {
        throw Error(personIncomeInformation.statusText);
      }
    })
    .then(json => {
      this.setState({
        loading: false,
        totalIncome: json.totalIncome,
        monthsIncomeInformation: json.monthsIncomeInformation,
        employerSummaries: json.employerSummaries
      });
    })
    .catch(error => console.error(error));
  }
}

function QualifiedMessage(props) {
    return (
        <AlertStripe type={props.doesPersonQualify ? "suksess" : "feil"}>
            Du er {props.doesPersonQualify ? "kvalifisert" : "ikke kvalifisert"} for dagpenger.
        </AlertStripe>
    );
}

function TotalInntekt(props) {
    return (
        <Normaltekst>
          Din totale inntekt for de siste 36 månedene er {props.totalIncome}.
        </Normaltekst>
    );
}

function EmployerList(props) {
  return (
      <div>
        <Innholdstittel>Arbeidsgivere</Innholdstittel>
        <ul>
            {props.employerSummaries.map(
                employer => <EmployerSummary employer={employer}/>)}
        </ul>
      </div>
  );
}

function EmployerSummary(props) {
  return (
      <li>
        <Undertittel>{props.employer.name}</Undertittel>
        <div>
            Total inntekt: {props.employer.income}
        </div>
      </li>
  )
}

function EmployersMonth(props) {
    var moment = require('moment');
    moment.locale('nb');
    return (
            <li>
                <Ekspanderbartpanel tittel={moment(props.month.month, 'YYYY-MM').format('MMMM YYYY')}>
                <ul>
                    {props.month.employers.map(
                        arbeidsgiver => <Employer employer={arbeidsgiver}/>)}
                </ul>
                </Ekspanderbartpanel>
            </li>
    );
}

function Employer(props) {
  return (
      <li>
        <Ekspanderbartpanel tittel={props.employer.name + ": " + props.employer.income + " kroner"} border>
            <ul>
                <li>
                    Fastlønn:
                </li>
                <li>
                    Bonus:
                </li>
            </ul>
        </Ekspanderbartpanel>
      </li>
  )
}

function AllMonths(props) {
  return (
      <div>
        <Innholdstittel>Månedsoversikt</Innholdstittel>
        <ul>
            {props.monthsIncomeInformation.map(
                month => <EmployersMonth month={month}/>)}
        </ul>
      </div>
  );
}

function getQueryVariable(variable, path) {
  const query = path.substring(1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return (false);
}

export default App;
