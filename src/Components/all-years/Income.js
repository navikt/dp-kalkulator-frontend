import React from 'react';
import PropTypes from 'prop-types';

export default function Income({ verdikode, income }) {
  return (
    <ul>
      {`${verdikode}: ${income}`}
    </ul>
  );
}
Income.propTypes = {
  verdikode: PropTypes.string.isRequired,
  income: PropTypes.number.isRequired,
};
