import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import EmployersMonth from './EmployersMonth';


export default function AllMonths({ monthsIncomeInformation, year }) {
  moment.locale('nb');
  return (
    <div tittel={year}>
      <ul>
        {monthsIncomeInformation.map(month => (<EmployersMonth key={month.month.toString()} month={month.month} employers={month.employers} />))}
      </ul>
    </div>
  );
}
AllMonths.propTypes = {
  monthsIncomeInformation: PropTypes.arrayOf(PropTypes.shape()),
  year: PropTypes.string.isRequired,
};
