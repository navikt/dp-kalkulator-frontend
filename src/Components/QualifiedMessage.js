import AlertStripe from 'nav-frontend-alertstriper';
import React from 'react';
import PropTypes from 'prop-types';
import PositiveResponse from './responses/PositiveResponse';
import NegativeResponse from './responses/NegativeResponse';

export default function QualifiedMessage({ doesPersonQualify, ukeSats, periodeAntalluker }) {
  return (
    <AlertStripe type={doesPersonQualify ? 'suksess' : 'advarsel'}>
      {doesPersonQualify ? <PositiveResponse ukeSats={ukeSats} periodeAntalluker={periodeAntalluker} /> : <NegativeResponse />}
    </AlertStripe>
  );
}

QualifiedMessage.propTypes = {
  doesPersonQualify: PropTypes.bool.isRequired,
  ukeSats: PropTypes.number,
  periodeAntalluker: PropTypes.string,
};
