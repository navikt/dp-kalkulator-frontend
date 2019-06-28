import React from 'react';
import './App.css';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import PanelBase from 'nav-frontend-paneler';

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
          <h1>Vår info </h1>
          {this.state.totalIncome === null ? <br/> : <TotalInntekt
              totalIncome={this.state.totalIncome}/>}
          <div>Laster fortsatt: {this.state.loading ? "yes" : "no"} </div>
          <div>Hvis noe av oppgitt data her er feil, kontakt oss på nav.no</div>
          <div>Personnummeret ditt er: {this.state.personnummer} </div>
          <div>Kvalifisert for dagpenger: {this.state.doesPersonQualify ? "ja"
              : "nei"} </div>
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

function EmployerList(props) {
  return (
      <ul>
        {props.employerSummaries.map(
            employer => <EmployerSummary employer={employer}/>)}
      </ul>
  );
}

function TotalInntekt(props) {
  return (
      <div>
        Din totale inntekt de siste 36 måneder: {props.totalIncome}
      </div>
  );
}

function EmployerSummary(props) {
  return (
      <li>
        <div>Arbeidsgiver: {props.employer.name}</div>
        <div>Organisasjonsnummer: {props.employer.orgID}</div>
        <div>Total inntekt: {props.employer.income}</div>
      </li>
  )
}

function EmployersMonth(props) {
  return (
      <li>
        <Ekspanderbartpanel tittel={"Måned:" + props.month.month}>
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
        <div>Arbeidsgiver: {props.employer.name}</div>
        <div>OrganisasjonsID: {props.employer.orgID}</div>
        <div>Inntekt: {props.employer.income}</div>
      </li>
  )
}

function AllMonths(props) {
  return (
      <ul>
        {props.monthsIncomeInformation.map(
            month => <EmployersMonth month={month}/>)}
      </ul>
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
