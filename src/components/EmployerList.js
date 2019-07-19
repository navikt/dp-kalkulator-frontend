import { Innholdstittel } from 'nav-frontend-typografi';
import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import PropTypes from 'prop-types';

export default function EmployerList({ employerSummaries }) {
  return (
    <div>
      <Innholdstittel>Arbeidsgivere</Innholdstittel>
      <ul>
        {employerSummaries.map(
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

EmployerList.propTypes = {
  employerSummaries: PropTypes.arrayOf(PropTypes.shape()),
};

function EmployerSummary({ name, income, employmentPeriodes }) {
  return (
    <li>
      <Ekspanderbartpanel tittel={name} border>
        <ul>
            Total inntekt:
          {' '}
          {income}
          {' '}
kr

        </ul>
        <ul>
          {employmentPeriodes.map(
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

EmployerSummary.propTypes = {
  name: PropTypes.string,
  income: PropTypes.number,
  employmentPeriodes: PropTypes.arrayOf(PropTypes.shape()),
};

function EmploymentPeriode({ startDate, endDate }) {
  const moment = require('moment');
  moment.locale('nb');
  return (
    <ul>
        Periode:
      {' '}
      {(startDate
          === endDate) ? moment(
          startDate, 'YYYY-MM',
        ).format('MMMM YYYY')
        : `${moment(startDate, 'YYYY-MM').format(
          'MMMM YYYY',
        )} til ${moment(endDate,
          'YYYY-MM').format('MMMM YYYY')}`}
    </ul>
  );
}

EmploymentPeriode.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};
