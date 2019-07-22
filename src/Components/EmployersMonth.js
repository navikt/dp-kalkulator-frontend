import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import React from 'react';
import PropTypes from 'prop-types';
import Employer from './Employer';

export default function EmployersMonth({ month, employers }) {
  const moment = require('moment');
  moment.locale('nb');
  return (
    <li>
      <Ekspanderbartpanel tittel={moment(month.toString(), 'YYYY-MM').format('MMMM YYYY')} border>
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
};
