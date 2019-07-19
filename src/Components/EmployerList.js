import { Innholdstittel } from 'nav-frontend-typografi';
import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import HjelpetekstBase from 'nav-frontend-hjelpetekst';
import PropTypes from 'prop-types';

export default function EmployerList({ employerSummaries }) {
  return (
    <div>
      <Innholdstittel>
Arbeidsgivere
        <HjelpetekstBase type="auto"> Dine arbeidsgivere de 36 siste månedene</HjelpetekstBase>
      </Innholdstittel>
      <ul>
        <li>
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
        </li>
      </ul>
    </div>
  );
}

EmployerList.propTypes = {
  employerSummaries: PropTypes.arrayOf(PropTypes.shape()),
};

function EmployerSummary({ name, income, employmentPeriodes }) {
  return (
    <ul>
      <Ekspanderbartpanel tittel={name} border>
        <li>
            Total inntekt:
          {' '}
          {income}
          {' '}
kr

        </li>
        <li>
          {employmentPeriodes.map(
            periode => (
              <EmploymentPeriode
                key={periode.startDateYearMonth}

                startDate={periode.startDateYearMonth}
                endDate={periode.endDateYearMonth}
              />
            ),
          )}
        </li>


      </Ekspanderbartpanel>
    </ul>
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
      <li>
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
      </li>
    </ul>
  );
}

EmploymentPeriode.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};
