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
        <em className="incomeNumber">
          {totalIncome.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
          }
        </em>
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
        <em className="incomeNumber">
          {(totalIncome
            / months).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
          }
        </em>
        {' '}
kr
      </li>

    </Normaltekst>


  );
}

TotalInntekt.propTypes = {
  months: PropTypes.number.isRequired,
  totalIncome: PropTypes.number.isRequired,
};
