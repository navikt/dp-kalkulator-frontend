import Panel from 'nav-frontend-paneler'
import React from 'react';
import PropTypes from 'prop-types';
import PositiveResponse from './responses/PositiveResponse';
import NegativeResponse from './responses/NegativeResponse';

export default function QualifiedMessage({ doesPersonQualify, ukeSats, periodeAntalluker }) {
  const panelStyle = {
    background: '#e0f5fb'
  }
  return (
    <Panel style={panelStyle}>
      {doesPersonQualify ? <PositiveResponse ukeSats={ukeSats} periodeAntalluker={periodeAntalluker} /> : <NegativeResponse />}
    </Panel>
  );
}

QualifiedMessage.propTypes = {
  doesPersonQualify: PropTypes.bool.isRequired,
  ukeSats: PropTypes.number,
  periodeAntalluker: PropTypes.string,
};
