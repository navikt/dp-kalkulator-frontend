import React from "react";
import Lenke from "nav-frontend-lenker";
import NavFrontendChevron from "nav-frontend-chevron";
import LENKER from "../lib/constants";
import { useTextContext } from "../utils/TextProvider";
import { logLenkeKlikk } from "../lib/tracking";

const BackButton = () => {
  const text = useTextContext();
  return (
    <Lenke
      className={"knapp--kompakt knapp--mini knapp--flat knapp"}
      onClick={() => logLenkeKlikk(LENKER.DAGPENGER_FAKTASIDE_URL, text.tilbake)}
      href={LENKER.DAGPENGER_FAKTASIDE_URL}
    >
      <NavFrontendChevron type="venstre" /> {text.tilbake}
    </Lenke>
  );
};
export default BackButton;
