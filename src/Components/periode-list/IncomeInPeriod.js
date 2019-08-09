import React from 'react';
import PropTypes from 'prop-types';

export default function IncomeInPeriod({
  periodNumber, startMonth, endMonth, totalIncome,
}) {
  return (
    <div>
      Periode
      {' '}
      {periodNumber}
      {': '}
      {startMonth}
      {' - '}
      {endMonth}
      {': '}
      <em className="incomeNumber">
        {totalIncome.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
      </em>
      {' '}
      kr
    </div>
  );
}

IncomeInPeriod.propTypes = {
  periodNumber: PropTypes.number,
  startMonth: PropTypes.string,
  endMonth: PropTypes.string,
  totalIncome: PropTypes.number,
};
