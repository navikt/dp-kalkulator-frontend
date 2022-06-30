import React from "react";
import PropTypes from "prop-types";
import { PositiveResponse } from "./PositiveResponse";
import NegativeResponse from "./NegativeResponse";

export const QualifiedMessage = ({ isOppfyllerInntekstkrav, ukesats, periodeAntallUker }) => (
  <div className="panelblue padding16">
    {isOppfyllerInntekstkrav ? <PositiveResponse ukesats={ukesats} periodeAntallUker={periodeAntallUker} /> : <NegativeResponse />}
  </div>
);

QualifiedMessage.propTypes = {
  isOppfyllerInntekstkrav: PropTypes.bool.isRequired,
  ukesats: PropTypes.number,
  periodeAntallUker: PropTypes.number,
};

QualifiedMessage.defaultProps = {
  ukesats: undefined,
  periodeAntallUker: undefined,
};

export default QualifiedMessage;
