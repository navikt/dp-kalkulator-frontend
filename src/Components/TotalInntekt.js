import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import PropTypes from 'prop-types';

export default function TotalInntekt({ months, totalIncome }) {
  return (


    <Normaltekst>

      <li>
              Dine inntekter de siste
        {' '}
        {months}
        {' '}
månedene:
        {' '}
        {totalIncome.toFixed(2)}
        {' '}
kr
      </li>
      <li>
             Din gjennomsnittlige inntekt de siste
        {' '}
        {months}
        {' '}
månedene:
        {' '}
        {(totalIncome
            / months).toFixed(2)}
kr.
      </li>

    </Normaltekst>


  );
}

TotalInntekt.propTypes = {
  months: PropTypes.number.isRequired,
  totalIncome: PropTypes.number.isRequired,
};
