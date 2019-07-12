import React from 'react';
import './App.css';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import PanelBase from 'nav-frontend-paneler';
import { Sidetittel, Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import AlertStripe from 'nav-frontend-alertstriper';

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

            <img src="https://www.nav.no/_public/beta.nav.no/images/logo.png?_ts=1512923c9b0" alt={"NAV-logo-rød-trans-bg-200.png"}/>

            <Sidetittel>Din inntekt {this.state.loading ? <NavFrontendSpinner/> : <br/>} </Sidetittel>
            <p>
            <b>Her vises opplysninger om dine inntekter. NAV bruker blant annet disse opplysningene for å vurdere om du har rett til dagpenger, hvor lenge og hvor mye du kan få i dagpenger.</b>
            {this.state.totalIncome === null ? <br/> : <TotalInntekt totalIncome={this.state.totalIncome}/>}
            {this.state.totalIncome12 === null ? <br/> : <TotalInntekt12 totalIncome12={this.state.totalIncome12}/>}
            <Normaltekst>Din arbeidsgiver og andre som utbetaler inntekter til deg rapporterer disse opplysningene til a-ordningen minst én gang i måneden. Oppdager du feil? Ta kontakt med de som har rapportert opplysningene.</Normaltekst>
            </p>

            <PanelBase border>
                {this.state.employerSummaries === null ? <br/> :
                    <EmployerList
                        employerSummaries={this.state.employerSummaries}/>}
                {this.state.monthsIncomeInformation === null ? <br/> :
                    <AllYears
                        monthsIncomeInformation={this.state.monthsIncomeInformation}/>}
            </PanelBase>
            <QualifiedMessage doesPersonQualify={this.state.doesPersonQualify}/>
        </div>
    );
  }

  componentDidMount() {
    document.cookie = "nav-esso=2416281490ghj; domain=.myapp.com";
    document.cookie = `beregningsdato=${((new Date()).toISOString().split("T")[0])}; domain=.myapp.com`;
    this.setState({
      loading: true
    });
    fetch("http://backend.myapp.com:8099/inntekt",{
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include'
    })

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
            {props.doesPersonQualify ? <PositivResponse/>   : <NegativeResponse/>}
        </AlertStripe>
    );
}
function PositivResponse() {
    return (
        <div>
        <Normaltekst>
            <h5> Du kan ha tjent nok til å ha rett på dagpenger</h5>

            A-ordningen viser at du har hatt inntekter over 1,5 ganger folketrygdens grunnbeløp (1,5 G) de siste 12 månedene eller 3 G de siste 36 månedene, og kan derfor ha tjent nok til å ha rett på dagpenger.
            <p>
                <b >Du kan likevel avslag på søknaden på grunn av for lav inntekt hvis:</b>
                <ul>
                <li>Du har mottatt dagpenger i løpet av de siste 36 månedene, og inntekter som vises her har allerede blitt brukt opp i en tidligere dagpengeperiode. Du kan i mange tilfeller ha rett på dagpenger selv om du har mottatt dagpenger de siste 36 månedene. </li>
                <li>Du får innvilget dagpenger fra en dato fram i tid. Da kan nyere inntekter bli tatt med i vurderingen av om du har rett på dagpenger. Dette kan i noen tilfeller kan føre til at du ikke har tjent nok.</li>
                <li>Opplysningene i a-ordningen er feil, for eksempel fordi arbeidsgiveren din har rapportert for høy inntekt for deg en måned. </li>
                </ul>
            </p>
            <b>Vi anbefaler at du sender en søknad om dagpenger selv hvis du er usikker på om du har tjent nok, så kan en saksbehandler vurdere dette.</b>
        </Normaltekst>
        </div>
    );
}

function NegativeResponse() {
    return (
        <div>
            <Normaltekst>
                <h4> Du kan ha tjent for lite til å ha rett på dagpenger</h4>
                    A-ordningen viser at du har hatt inntekter under 1,5 ganger folketrygdens grunnbeløp (1,5 G) de siste 12 månedene eller 3 G de siste 36 månedene, og kan derfor ha tjent for lite til å ha rett på dagpenger.
                <p>

                    <b>Følgende hendelser kan likevel gjøre at du har tjent nok til å ha rett på dagpenger:</b>
                    <ul>
                    <li>Du har hatt verneplikt, og kan likevel ha rett på dagpenger </li>
                    <li>Du får innvilget dagpenger fra en dato fram i tid. Da kan nyere inntekter bli tatt med i vurderingen av om du har rett på dagpenger og dette kan føre til at du har tjent nok </li>
                    <li>Du har hatt arbeid i et annet EØS-land. Opplysninger om lønn fra andre EØS-land registreres ikke i a-ordningen. </li>
                    <li>Opplysningene i a-ordningen er feil, for eksempel fordi arbeidsgiveren din har rapportert for høy inntekt for deg en måned. </li>
                    </ul>
                </p>
                <b>Vi anbefaler at du sender en søknad om dagpenger selv hvis du er usikker på om du har tjent nok, så kan en saksbehandler vurdere dette.</b>
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
        <ul>
            Periode:  {(props.periode.startDateYearMonth === props.periode.endDateYearMonth) ? moment(props.periode.startDateYearMonth, 'YYYY-MM').format('MMMM YYYY') :  moment(props.periode.startDateYearMonth, 'YYYY-MM').format('MMMM YYYY') +" til " +moment(props.periode.endDateYearMonth, 'YYYY-MM').format('MMMM YYYY') }
        </ul>
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
      <ul>
            {props.income.verdikode + ": " + props.income.income}
      </ul>
  )
}
function AllYears(props) {
    let yearBuckets = [[], [], [], []];
    for (let i = 0; i < props.monthsIncomeInformation.length; i++) {
      yearBuckets[(props.monthsIncomeInformation[i].month.split("-")[0]) % 4].push(props.monthsIncomeInformation[i]);
    }
    let noEmptyYearBuckets = yearBuckets.filter(year => year.length > 0);
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


export default App;
