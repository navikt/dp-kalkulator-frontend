import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';

export default function TotalInntekt(props) {
  return (
    <Normaltekst>

      <li>
          Dine inntekter de siste
        {' '}
        {props.months}
        {' '}
månedene:
        {' '}
        {props.totalIncome.toFixed(2)}
        {' '}
kr
      </li>
      <li>
          Din gjennomsnittlige inntekt de siste
        {' '}
        {props.months}
        {' '}
månedene:
        {' '}
        {(props.totalIncome
            / props.months).toFixed(2)}
kr.
      </li>

    </Normaltekst>
  );
}
