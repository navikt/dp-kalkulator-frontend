import React from 'react';
import PropTypes from 'prop-types';

export default function Income({ verdikode, income }) {
  return (
    <ul className="a">
      {verdikode}
      {': '}
      {income.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
      {' '}
      kr
    </ul>
  );
}
Income.propTypes = {
  verdikode: PropTypes.string.isRequired,
  income: PropTypes.number.isRequired,
};
