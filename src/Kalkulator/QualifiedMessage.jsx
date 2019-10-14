import Panel from 'nav-frontend-paneler';
import React from 'react';
import PropTypes from 'prop-types';
import PositiveResponse from './PositiveResponse';
import NegativeResponse from './NegativeResponse';

export default function QualifiedMessage({ oppfyllerInntekstkrav, ukesats, periodeAntalluker }) {
  return <Panel>{oppfyllerInntekstkrav ? <PositiveResponse ukeSats={ukesats} periodeAntalluker={periodeAntalluker} /> : <NegativeResponse />}</Panel>;
}

QualifiedMessage.propTypes = {
  oppfyllerInntekstkrav: PropTypes.bool.isRequired,
  ukesats: PropTypes.number,
  periodeAntalluker: PropTypes.number,
};

QualifiedMessage.defaultProps = {
  ukesats: undefined,
  periodeAntalluker: undefined,
};
