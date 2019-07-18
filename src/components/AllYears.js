import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import React from "react";
import {Innholdstittel} from "nav-frontend-typografi";

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
                                         month={month.month}
                employers={month.employers}/>)}
          </ul>
        </Ekspanderbartpanel>
      </li>
  );
}

function EmployersMonth(props) {
  var moment = require("moment");
  moment.locale("nb");
  return (
      <li>
        <Ekspanderbartpanel
            tittel={moment(props.month.toString(), "YYYY-MM").format(
                "MMMM YYYY")}>
          <ul>
            {props.employers.map(
                employer => <Employer key={employer.name}
                                          name={employer.name}
                incomes={employer.incomes}/>)}
          </ul>
        </Ekspanderbartpanel>
      </li>
  );
}

function Employer(props) {
  return (
      <li>
        <Ekspanderbartpanel tittel={props.name} border>
          <ul>
            {props.incomes.map(
                income => <Income key={income.verdikode} income={income.income}
                verdikode={income.verdikode}/>)}
          </ul>
        </Ekspanderbartpanel>
      </li>
  );
}

function Income(props) {
  return (
      <ul>
        {props.verdikode + ": " + props.income}
      </ul>
  );
}
