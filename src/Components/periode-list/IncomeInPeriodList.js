import React from 'react';
import PropTypes from 'prop-types';
import IncomeInPeriod from './IncomeInPeriod';

export default function IncomeInPeriodList({ periodIncome }) {
  return (
    <ul>
      {periodIncome.map(period => (
        <IncomeInPeriod
          periodNumber={period.periodNum}
          startMonth={period.startMonth}
          endMonth={period.endMonth}
          totalIncome={period.totalIncome}
        />
      ))}
    </ul>
  );
}

IncomeInPeriodList.propTypes = {
  periodIncome: PropTypes.arrayOf(PropTypes.shape()),
};
