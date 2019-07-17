import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import React from "react";
import {Innholdstittel} from "nav-frontend-typografi";

function EmployersMonth(props) {
  var moment = require("moment");
  moment.locale("nb");
  return (
      <li>
        <Ekspanderbartpanel
            tittel={moment(props.month.month.toString(), "YYYY-MM").format(
                "MMMM YYYY")}>
          <ul>
            {props.month.employers.map(
                arbeidsgiver => <Employer key={arbeidsgiver.name}
                                          employer={arbeidsgiver}/>)}
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
                income => <Income key={income.verdikode} income={income}/>)}
          </ul>
        </Ekspanderbartpanel>
      </li>
  );
}

function Income(props) {
  return (
      <ul>
        {props.income.verdikode + ": " + props.income.income}
      </ul>
  );
}

export function AllYears(props) {
  let yearBuckets = [[], [], [], []];
  for (let i = 0; i < props.monthsIncomeInformation.length; i++) {
    yearBuckets[(props.monthsIncomeInformation[i].month.split("-")[0])
    % 4].push(props.monthsIncomeInformation[i]);
  }
  let noEmptyYearBuckets = yearBuckets.filter(year => year.length > 0);
  noEmptyYearBuckets.sort(function (list1, list2) {
    return ((list2[0]).month.split("-")[0] - (list1[0]).month.split("-")[0]);
  });
  return (
      <div>
        <Innholdstittel>Årsoversikt</Innholdstittel>
        <ul>
          {noEmptyYearBuckets.map(monthIncomeInformation => <AllMonths
              key={monthIncomeInformation[0].month.split("-")[0]}
              monthsIncomeInformation={monthIncomeInformation}
              year={monthIncomeInformation[0].month.split("-")[0]}/>)}
        </ul>
      </div>
  );
}

function AllMonths(props) {
  let moment = require("moment");
  moment.locale("nb");
  return (
      <li>
        <Ekspanderbartpanel tittel={props.year}>
          <Innholdstittel>Månedsoversikt</Innholdstittel>
          <ul>
            {props.monthsIncomeInformation.map(
                month => <EmployersMonth key={month.month.toString()}
                                         month={month}/>)}
          </ul>
        </Ekspanderbartpanel>
      </li>
  );
}