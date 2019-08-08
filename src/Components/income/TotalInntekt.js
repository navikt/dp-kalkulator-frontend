import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import PropTypes from 'prop-types';

export default function TotalInntekt({ months, totalIncome }) {
  return (
    <Normaltekst>
      Dine inntekter de siste
      {' '}
      {months}
      {' '}
      månedene:
      {' '}
      <em className="incomeNumber">
        {totalIncome.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        }
      </em>
      {' '}
      kr
    </Normaltekst>


  );
}

TotalInntekt.propTypes = {
  months: PropTypes.number.isRequired,
  totalIncome: PropTypes.number.isRequired,
};
