import {Innholdstittel} from "nav-frontend-typografi";
import React from "react";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";

export function EmployerList(props) {
  return (
      <div>
        <Innholdstittel>Arbeidsgivere</Innholdstittel>
        <ul>
          {props.employerSummaries.map(
              employerSummery => <EmployerSummary key={employerSummery.name}
                                                  employerSummery={employerSummery}/>)}


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
                periode => <EmploymentPeriode key={periode.startDateYearMonth}
                                              periode={periode}/>)}
          </ul>


        </Ekspanderbartpanel>
      </li>
  );
}

function EmploymentPeriode(props) {
  console.log(props.periode.startDateYearMonth);
  var moment = require("moment");
  moment.locale("nb");
  return (
      <ul>
        Periode: {(props.periode.startDateYearMonth
          === props.periode.endDateYearMonth) ? moment(
          props.periode.startDateYearMonth, "YYYY-MM").format("MMMM YYYY")
          : moment(props.periode.startDateYearMonth, "YYYY-MM").format(
          "MMMM YYYY") + " til " + moment(props.periode.endDateYearMonth,
          "YYYY-MM").format("MMMM YYYY")}
      </ul>
  );

}