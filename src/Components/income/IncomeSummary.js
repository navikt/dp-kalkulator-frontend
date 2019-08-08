import React from 'react';
import PropTypes from 'prop-types';
import TotalInntekt from './TotalInntekt';

export default function IncomeSummary({ totalIncome36, totalIncome12 }) {
  return (
    <div>
      <ul>
        {totalIncome36 == null ? <br /> : <TotalInntekt totalIncome={totalIncome36} months={36} />}
        {totalIncome12 == null ? <br /> : <TotalInntekt totalIncome={totalIncome12} months={12} />}
      </ul>
    </div>
  );
}
IncomeSummary.propTypes = {
  totalIncome36: PropTypes.number,
  totalIncome12: PropTypes.number,
};
