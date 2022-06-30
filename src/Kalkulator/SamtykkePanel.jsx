import React from "react";
import PropTypes from "prop-types";
import Spacer from "../Components/Spacer";
import { useTextContext } from "../utils/TextProvider";
import BlockContent from "../utils/BlockContent";
import { logVisning } from "../lib/tracking";
import { Button, Panel } from "@navikt/ds-react";

export const SamtykkePanel = ({ onClickCallback }) => {
  const text = useTextContext();
  logVisning("Viser samtykkepanelet (forsiden når en bruker har landet på kalkulatoren)");
  return (
    <Panel>
      <div className="padding16">
        <BlockContent blocks={text.samtykke} />

        <Spacer twentyPx />
        <div className="flex center">
          <Button variant="primary" onClick={onClickCallback}>
            {text.fortsettknapp}
          </Button>
        </div>
      </div>
    </Panel>
  );
};

SamtykkePanel.propTypes = {
  onClickCallback: PropTypes.func.isRequired,
};

export default SamtykkePanel;
