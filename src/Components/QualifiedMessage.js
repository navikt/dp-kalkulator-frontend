import AlertStripe from 'nav-frontend-alertstriper';
import React from 'react';
import PropTypes from 'prop-types';
import PositiveResponse from './responses/PositiveResponse';
import NegativeResponse from './responses/NegativeResponse';

export default function QualifiedMessage({ doesPersonQualify, beløp, periode }) {
  return (
    <AlertStripe type={doesPersonQualify ? 'suksess' : 'advarsel'}>
      {doesPersonQualify ? <PositiveResponse beløp={beløp} periode={periode} /> : <NegativeResponse />}
    </AlertStripe>
  );
}

QualifiedMessage.propTypes = {
  doesPersonQualify: PropTypes.bool.isRequired,
  beløp: PropTypes.number,
  periode: PropTypes.string,
};
