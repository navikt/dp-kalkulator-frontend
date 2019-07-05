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
            <Normaltekst>Din arbebiedsgiver og andre som utbetaler ytelser rapporterer dine inntekter til a-ordningen. Oppdager du feil? Ta kontakt med de som har rapportert opplysningene.</Normaltekst>
            
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
    console.log(personnummer);
    this.setState({
      personnummer: personnummer,
      loading: true
    });
    /*const json = '{"totalIncome":"1858201","employerSummaries":[{"name":"NAV","orgID":"144132","income":"1858201","startMonth":"2019-07","endMonth":"2019-07"}],"monthsIncomeInformation":[{"month":"2019-07","employers":[{"name":"NAV","orgID":"144132","income":"58.32"}]}]}';
    const obj = JSON.parse(json);
    this.setState({
      monthsIncomeInformation: obj.monthsIncomeInformation,
      totalIncome: obj.totalIncome,
      employerSummaries: obj.employerSummaries
    });*/
    const personObject = {
          personnummer: "15118512351",
          beregningsdato: "2019-03-01",
          token:"1234567890ABCDEFghijkl"

    };
    const fetchRequest = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(personObject)
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
      console.log(json);
      console.log(this.employerSummaries)
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
          Din totale inntekt for de siste 36 månedene er: {props.totalIncome} kr, din gjennomsnittlig inntekt de siste 36 månedene har vært har vært {(props.totalIncome / 36).toFixed(2)} kr.

          Din totale inntekt for de siste 12 månedene er: {props.totalIncome12} kr, din gjennomsnittlig inntekt de siste 12 månedene har vært {(props.totalIncome12 / 12).toFixed(2)} kr .
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
        <li>
            periode = fra {moment(props.periode.startDateYearMonth, 'YYYY-MM').format('MMMM YYYY') +" til " +moment(props.periode.endDateYearMonth, 'YYYY-MM').format('MMMM YYYY') }
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
    console.log(props.monthsIncomeInformation);
    //const monthsIncomeInformationByYear = props.monthsIncomeInformation.map(month => month.groupeBy(props.monthsIncomeInformation, month.toString().split("-",1)));
    //console.log(monthsIncomeInformationByYear);
    return (
        <div>
            <Innholdstittel>Årsoversikt</Innholdstittel>
            <ul>
                {props.monthsIncomeInformation.map(
                    monthIncomeInformation => <AllMonths monthsIncomeInformation={props.monthsIncomeInformation} monthIncomeInformation={monthIncomeInformation}/>)}
            </ul>
        </div>
    );
}

//
// function Years(props) {
//     var moment = require('moment');
//     moment.locale('nb');
//     console.log(props.year.month)
//     return (
//         <li>
//             <Ekspanderbartpanel tittel={moment(props.year.month.toString(), 'YYYY-MM').format('MMMM YYYY')}>
//                 <ul>
//                     {props.monthsIncomeInformation.map(
//                         month => <EmployersMonth month={month}/>)}
//                 </ul>
//             </Ekspanderbartpanel>
//         </li>
//     );
// }


function AllMonths(props) {
    var moment = require('moment');
    moment.locale('nb');
    console.log(props.monthsIncomeInformation[0].month.toString().split("-",1))
    return (
      <li>
        <Ekspanderbartpanel tittel = {"20001"}>//moment(props.monthIncomeInformation.month.toString(), 'YYYY-;;').format('MMMM YYYY')}>
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
