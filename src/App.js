import React from 'react';
import './App.css';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import PanelBase from 'nav-frontend-paneler';
import { Sidetittel, Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import AlertStripe from 'nav-frontend-alertstriper';
import { HjelpetekstAuto } from 'nav-frontend-hjelpetekst';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalIncome: null, totalIncome12: null,
      employerSummaries: null,
      monthsIncomeInformation: null,
      doesPersonQualify: false
    };
  }

  render() {
    return (
        <div className="App">
            <Sidetittel>Din inntekt {this.state.loading ? <NavFrontendSpinner/> : <br/>} </Sidetittel>
            <p>
            <b>Her vises opplysninger om dine inntekter. NAV bruker blant annet disse opplysningene for å vurdere om du har rett til dagpenger, hvor lenge og hvor mye du kan få i dagpenger.</b>
            {this.state.totalIncome === null ? <br/> : <TotalInntekt totalIncome={this.state.totalIncome}/>}
            {this.state.totalIncome12 === null ? <br/> : <TotalInntekt12 totalIncome12={this.state.totalIncome12}/>}
            <Normaltekst>Din arbeidsgiver og andre som utbetaler inntekter til deg rapporterer disse opplysningene til a-ordningen minst én gang i måneden. Oppdager du feil? Ta kontakt med de som har rapportert opplysningene.</Normaltekst>
            </p>
            <p>

                <HelpTextForRejection> </HelpTextForRejection>
            </p>
            <PanelBase border>
                {this.state.employerSummaries === null ? <br/> :
                    <EmployerList
                        employerSummaries={this.state.employerSummaries}/>}
                {this.state.monthsIncomeInformation === null ? <br/> :
                    <AllYears
                        monthsIncomeInformation={this.state.monthsIncomeInformation}/>}
            </PanelBase>
        </div>
    );
  }

  componentDidMount() {
    const personnummer = getQueryVariable("personnummer",
        window.location.pathname);
    const beregningsdato = "2019-03-21";
    const token = "1234567890ABCDEFghijkl";
    this.setState({
      personnummer: personnummer,
      loading: true
    });
    const personObject = '{'
        + '"personnummer" :"' + personnummer + '"'
        + '"beregningsdato" :"'+ beregningsdato + '"'
        + '"token" : "' + token + '"'
        + '}';
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
        totalIncome12: json.totalIncome12,
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
            {props.doesPersonQualify ? <PositivResponse> </PositivResponse>  : <PositivResponse> </PositivResponse>}
        </AlertStripe>
    );
}
function PositivResponse(props) {
    return (
        <div>
        <Normaltekst>
            <p>
            A-ordningen viser at du har hatt inntekter over 1,5 ganger folketrygdens grunnbeløp (1,5 G) de siste 12 månedene eller 3 G de siste 36 månedene, og kan derfor ha tjent nok til å ha rett på dagpenger.
            </p>
            <p>
                Du kan likevel avslag på søknaden på grunn av for lav inntekt
                <HjelpetekstAuto tittel={""} >
                    Du har mottatt dagpenger i løpet av de siste 36 månedene, og inntekter som vises her har allerede blitt brukt opp i en tidligere dagpengeperiode. Du kan i mange tilfeller ha rett på dagpenger selv om du har mottatt dagpenger de siste 36 månedene. (OBS: regner med at hele denne kun vises for de som søker vanlig, og ikke gjenopptak?)

                    · Du får innvilget dagpenger fra en dato fram i tid. Da kan nyere inntekter bli tatt med i vurderingen av om du har rett på dagpenger. Dette kan i noen tilfeller kan føre til at du ikke har tjent nok.

                    · Opplysningene i a-ordningen er feil, for eksempel fordi arbeidsgiveren din har rapportert for høy inntekt for deg en måned.

            </HjelpetekstAuto>
            </p>
        </Normaltekst>
        </div>
    );
}


function TotalInntekt(props) {
    return (
        <Normaltekst>

                <li>
                    Mine inntekter de siste 36 månedene: {props.totalIncome.toFixed(2)} kr
                </li>
                <li>
                    Min gjennomsnittlige inntekt de siste 36 månedene: {(props.totalIncome / 36).toFixed(2)}kr.
                </li>

            </Normaltekst>
    );
}
function TotalInntekt12(props) {
    return (
        <Normaltekst>

                <li>
                    Mine inntekter de siste 12 månedene: {props.totalIncome12.toFixed()} kr
                </li>
                <li>
                    Min gjennomsnittlige inntekt de siste 12 månedene: {(props.totalIncome12 / 12).toFixed(2)}kr.
                </li>

        </Normaltekst>
    );
}

function EmployerList(props) {
    return (
      <div>
        <Innholdstittel>Arbeidsgivere</Innholdstittel>
        <ul>
            {props.employerSummaries.map(
                employerSummery => <EmployerSummary employerSummery={employerSummery}/>)}



        </ul>
      </div>
  );
}

function HelpTextForRejection(props) {
    return(
        <HjelpetekstAuto  >
            Innholdet vil vises når brukeren klikker på knappen.

        </HjelpetekstAuto>
    )
}

function EmployerSummary(props) {
    return (
      <li>
          <Ekspanderbartpanel tittel={props.employerSummery.name} border>
              <ul>
                  Total inntekt: {props.employerSummery.income} kr

              </ul>
              <ul>
                  {props.employerSummery.employmentPeriodes.map(
                      periode => <EmploymentPeriode periode={periode}/>)}
              </ul>


          </Ekspanderbartpanel>
      </li>
  )
}


function EmploymentPeriode(props) {
console.log(props.periode.startDateYearMonth);
    var moment = require('moment');
    moment.locale('nb');
    return(
        <li>
            Periode:  {(props.periode.startDateYearMonth === props.periode.endDateYearMonth) ? moment(props.periode.startDateYearMonth, 'YYYY-MM').format('MMMM YYYY') :  moment(props.periode.startDateYearMonth, 'YYYY-MM').format('MMMM YYYY') +" til " +moment(props.periode.endDateYearMonth, 'YYYY-MM').format('MMMM YYYY') }
        </li>
    )

}

function EmployersMonth(props) {
    var moment = require('moment');
    moment.locale('nb');
    return (
            <li>
                <Ekspanderbartpanel tittel={moment(props.month.month.toString(), 'YYYY-MM').format('MMMM YYYY')}>
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
        <Ekspanderbartpanel tittel={props.employer.name} border>
            <ul>
                {props.employer.incomes.map(
                  income => <Income income={income}/>)}
            </ul>
        </Ekspanderbartpanel>
      </li>
  )
}

function Income(props) {
  return (
      <li>
            {props.income.verdikode + ": " + props.income.income}
      </li>
  )
}
function AllYears(props) {
    let yearBuckets = [[], [], [], []];
    for (let i = 0; i < props.monthsIncomeInformation.length; i++) {
      yearBuckets[(props.monthsIncomeInformation[i].month.split("-")[0]) % 4].push(props.monthsIncomeInformation[i]);
    }
    let noEmptyYearBuckets = [];
    for (let i = 0; i < 4; i++) {
      if (yearBuckets[i].length > 0) noEmptyYearBuckets.push(yearBuckets[i]);
    }
    noEmptyYearBuckets.sort(function (list1, list2){return ((list2[0]).month.split("-")[0] - (list1[0]).month.split("-")[0])});
    return (
        <div>
            <Innholdstittel>Årsoversikt</Innholdstittel>
            <ul>
              {noEmptyYearBuckets.map(monthIncomeInformation => <AllMonths monthsIncomeInformation = {monthIncomeInformation} year={monthIncomeInformation[0].month.split("-")[0]} />)}
            </ul>
        </div>
    );
}

function AllMonths(props) {
    let moment = require('moment');
    moment.locale('nb');
    return (
      <li>
        <Ekspanderbartpanel tittel = {props.year}>
            <Innholdstittel>Månedsoversikt</Innholdstittel>
            <ul>
                {props.monthsIncomeInformation.map(
                    month => <EmployersMonth month={month}/>)}
            </ul>
        </Ekspanderbartpanel>
      </li>
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
