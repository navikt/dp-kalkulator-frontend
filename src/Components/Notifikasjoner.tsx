import * as React from "react";
import BlockContent from "../utils/BlockContent";
import { useTextContext } from "../utils/TextProvider";
import Spacer from "./Spacer";
import { Alert, Label } from "@navikt/ds-react";

export interface Notifikasjon {
  title?: string;
  innhold?: any[];
}

function Notifikasjoner() {
  const { notifikasjoner } = useTextContext();

  if (!notifikasjoner?.length) {
    return null;
  }

  return (
    <div>
      {notifikasjoner.map((notifikasjon, i) => (
        <div key={i}>
          <Alert variant="info" size="medium">
            <Label>{notifikasjon.title}</Label>
            {notifikasjon.innhold && <BlockContent blocks={notifikasjon.innhold} />}
          </Alert>
          <Spacer fourPx />
        </div>
      ))}
    </div>
  );
}

export default Notifikasjoner;
