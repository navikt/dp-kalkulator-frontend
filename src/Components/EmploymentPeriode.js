import React from 'react';
import PropTypes from 'prop-types';

export default function EmploymentPeriode({ startDate, endDate }) {
  const moment = require('moment');
  moment.locale('nb');
  return (<ul>
    <li>
      Periode:
        {' '}
      {(startDate
        === endDate) ? moment(startDate, 'YYYY-MM').format('MMMM YYYY')
        : `${moment(startDate, 'YYYY-MM').format('MMMM YYYY')} til ${moment(endDate, 'YYYY-MM').format('MMMM YYYY')}`}
    </li>
  </ul>);
}

EmploymentPeriode.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};
