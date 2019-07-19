import {Innholdstittel} from "nav-frontend-typografi";
import React from "react";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import HjelpetekstBase from "nav-frontend-hjelpetekst";

export function EmployerList(props) {
  return (
      <div>
        <Innholdstittel>Arbeidsgivere <HjelpetekstBase type={"auto"}> Dine arbeidsgivere de 36 siste månedene</HjelpetekstBase></Innholdstittel>
        <ul>
          <li>
          {props.employerSummaries.map(
              employerSummary => <EmployerSummary key={employerSummary.name}
                                                  name={employerSummary.name}
              income={employerSummary.income}
              employmentPeriodes={employerSummary.employmentPeriodes}/>)}

          </li>
        </ul>
      </div>
  );
}

function EmployerSummary(props) {
  return (
      <ul>
        <Ekspanderbartpanel tittel={props.name} border>
          <li>
            Total inntekt: {props.income} kr

          </li>
          <li>
            {props.employmentPeriodes.map(
                periode => <EmploymentPeriode key={periode.startDateYearMonth}

                startDate = {periode.startDateYearMonth}
                endDate = {periode.endDateYearMonth }/>)}
          </li>


        </Ekspanderbartpanel>
      </ul>
  );
}

function EmploymentPeriode(props) {
  var moment = require("moment");
  moment.locale("nb");
  return (
      <ul>
        <li>
        Periode: {(props.startDate
          === props.endDate) ? moment(
          props.startDate, "YYYY-MM").format("MMMM YYYY")
          : moment(props.startDate, "YYYY-MM").format(
          "MMMM YYYY") + " til " + moment(props.endDate,
          "YYYY-MM").format("MMMM YYYY")}
        </li>
        </ul>
  );

}