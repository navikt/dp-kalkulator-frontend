import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Employer from './Employer';


export default function EmployersMonth({ month, employers, monthTotalIncome }) {
  moment.locale('nb');
  const date = moment(month.toString(), 'YYYY-MM').format('MMMM');
  return (
    <li>
      <Ekspanderbartpanel tittel={date.charAt(0).toUpperCase() + date.slice(1)} border>
        <ul>
        Din totalinntekt i
          {' '}
          {date}
          {' '}
          var
          {' '}
          <em className="incomeNumber">
            {(monthTotalIncome).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
          </em>
          {' '}
          kr
        </ul>
        <hr />
        <ul>
          {employers.map(employer => (<Employer key={employer.name} name={employer.name} incomes={employer.incomes} />))}
        </ul>
      </Ekspanderbartpanel>
    </li>
  );
}
EmployersMonth.propTypes = {
  month: PropTypes.string.isRequired,
  employers: PropTypes.arrayOf(PropTypes.shape()),
  monthTotalIncome: PropTypes.number(),
};
