import React from "react";
import PropTypes from "prop-types";
import Panel from "nav-frontend-paneler";
import { Hovedknapp } from "nav-frontend-knapper";
import Spacer from "../Components/Spacer";
import { useTextContext } from "../utils/TextProvider";
import BlockContent from "../utils/BlockContent";
import { logVisning } from "../lib/tracking";

export const SamtykkePanel = ({ onClickCallback }) => {
  const text = useTextContext();
  logVisning({ viser: "Viser samtykkepanelet (forsiden når en bruker har landet på kalkulatoren)" });
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
