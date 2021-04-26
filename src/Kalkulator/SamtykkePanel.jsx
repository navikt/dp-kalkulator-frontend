import React from "react";
import PropTypes from "prop-types";
import Panel from "nav-frontend-paneler";
import { Hovedknapp } from "nav-frontend-knapper";
import tracking from "../lib/tracking";
import Spacer from "../Components/Spacer";
import { LENKER } from "../lib/constants";
import { useTextContext } from "../utils/TextProvider";
import BlockContent from "../utils/BlockContent";

export const SamtykkePanel = ({ onClickCallback }) => {
  const text = useTextContext();

  const handleClickMineInntekter = (event) => {
    event.preventDefault();
    tracking.logEvent("TIL_SKATTEETATEN");
    window.location.assign(LENKER.MINE_INNTEKTER_URL);
  };

  return (
    <Panel>
      <div className="padding16">
        <BlockContent blocks={text.samtykke} />

        <Spacer twentyPx />
        <div className="flex center">
          <Hovedknapp onClick={onClickCallback}>{text.fortsettknapp}</Hovedknapp>
        </div>
      </div>
    </Panel>
  );
};

SamtykkePanel.propTypes = {
  onClickCallback: PropTypes.func.isRequired,
};

export default SamtykkePanel;
