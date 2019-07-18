import { Innholdstittel } from 'nav-frontend-typografi';
import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

export function EmployerList(props) {
  return (
    <div>
      <Innholdstittel>Arbeidsgivere</Innholdstittel>
      <ul>
        {props.employerSummaries.map(
          employerSummary => (
            <EmployerSummary
              key={employerSummary.name}
              name={employerSummary.name}
              income={employerSummary.income}
              employmentPeriodes={employerSummary.employmentPeriodes}
            />
          ),
        )}


      </ul>
    </div>
  );
}

function EmployerSummary(props) {
  return (
    <li>
      <Ekspanderbartpanel tittel={props.name} border>
        <ul>
            Total inntekt:
          {' '}
          {props.income}
          {' '}
kr

        </ul>
        <ul>
          {props.employmentPeriodes.map(
            periode => (
              <EmploymentPeriode
                key={periode.startDateYearMonth}

                startDate={periode.startDateYearMonth}
                endDate={periode.endDateYearMonth}
              />
            ),
          )}
        </ul>


      </Ekspanderbartpanel>
    </li>
  );
}

function EmploymentPeriode(props) {
  const moment = require('moment');
  moment.locale('nb');
  return (
    <ul>
        Periode:
      {' '}
      {(props.startDate
          === props.endDate) ? moment(
          props.startDate, 'YYYY-MM',
        ).format('MMMM YYYY')
        : `${moment(props.startDate, 'YYYY-MM').format(
          'MMMM YYYY',
        )} til ${moment(props.endDate,
          'YYYY-MM').format('MMMM YYYY')}`}
    </ul>
  );
}
