import React from 'react';
import PropTypes from 'prop-types';
import TotalInntekt from './TotalInntekt';

export default function IncomeSummary({ totalIncome36, totalIncome12 }) {
  return (
    <div>
      <b>Her vises opplysninger om dine inntekter hentet fra a-ordningen.</b>
      <br />
      <b>Rett på dagpenger baserer seg enten på inntekter siste 36 måneder eller inntekter siste 12 måneder.</b>
      <ul className="a">
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
