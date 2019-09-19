import Panel from 'nav-frontend-paneler'
import React from 'react';
import PropTypes from 'prop-types';
import PositiveResponse from './PositiveResponse';
import NegativeResponse from './NegativeResponse';

export default function QualifiedMessage({ oppfyllerInntekstkrav, ukesats, periodeAntalluker }) {
  const panelStyle = {
    background: '#e0f5fb'
  }
  return (
    <Panel style={panelStyle}>
      {oppfyllerInntekstkrav ? <PositiveResponse ukeSats={ukesats} periodeAntalluker={periodeAntalluker} /> : <NegativeResponse />}
    </Panel>
  );
}

QualifiedMessage.propTypes = {
  oppfyllerInntekstkrav: PropTypes.bool.isRequired,
  ukesats: PropTypes.number,
  periodeAntalluker: PropTypes.number,
};
