import React from "react";
import LENKER from "../lib/constants";
import { useTextContext } from "../utils/TextProvider";
import { logLenkeKlikk } from "../lib/tracking";
import { Left } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";

const BackButton = () => {
  const text = useTextContext();
  return (
    <Button variant={"secondary"} onClick={() => logLenkeKlikk(LENKER.DAGPENGER_FAKTASIDE_URL, text.tilbake)} href={LENKER.DAGPENGER_FAKTASIDE_URL}>
      <Left />
      {text.tilbake}
    </Button>
  );
};
export default BackButton;
