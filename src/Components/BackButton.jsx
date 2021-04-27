import React from "react";
import tracking from "../lib/tracking";
import Lenke from "nav-frontend-lenker";
import NavFrontendChevron from "nav-frontend-chevron";
import LENKER from "../lib/constants";
import { useTextContext } from "../utils/TextProvider";

const BackButton = () => {
  const text = useTextContext();
  return (
    <Lenke
      className={"knapp--kompakt knapp--mini knapp--flat knapp"}
      onClick={() => tracking.logEvent("TILBAKE_TIL_DAGPENGER")}
      href={LENKER.DAGPENGER_FAKTASIDE_URL}
    >
      <NavFrontendChevron type="venstre" /> {text.tilbake}
    </Lenke>
  );
};
export default BackButton;
