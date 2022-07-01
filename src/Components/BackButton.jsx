import React from "react";
import LENKER from "../lib/constants";
import { useTextContext } from "../utils/TextProvider";
import { logLenkeKlikk } from "../lib/tracking";
import { Left } from "@navikt/ds-icons";
import { Link } from "@navikt/ds-react";

const BackButton = () => {
  const text = useTextContext();
  return (
    <Link onClick={() => logLenkeKlikk(LENKER.DAGPENGER_FAKTASIDE_URL, text.tilbake)} href={LENKER.DAGPENGER_FAKTASIDE_URL}>
      <Left />
      {text.tilbake}
    </Link>
  );
};
export default BackButton;
