import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

export default function EmploymentPeriode({ startDate, endDate }) {
  moment.locale('nb');
  return (
    <ul className="a">
      <li>
        {(startDate
        === endDate) ? moment(startDate, 'YYYY-MM').format('MMMM YYYY')
          : `${moment(startDate, 'YYYY-MM').format('MMMM YYYY')} - ${moment(endDate, 'YYYY-MM').format('MMMM YYYY')}`}
      </li>
    </ul>
  );
}

EmploymentPeriode.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};