import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import PropTypes from 'prop-types';
import EmploymentPeriode from './EmploymentPeriode';

export default function EmployerSummary({ name, income, employmentPeriodes }) {
  return (
    <ul>
      <Ekspanderbartpanel tittel={name} border>
        <li>
        Total inntekt:
          {' '}
          <em className="incomeNumber">
            {income.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
          </em>
          {' '}
          kr

        </li>
        <hr />
        <li>
          Utbetalingsperioder:
          {' '}
          {employmentPeriodes.map(periode => (
            <EmploymentPeriode key={periode.startDateYearMonth} startDate={periode.startDateYearMonth} endDate={periode.endDateYearMonth} />))}
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
