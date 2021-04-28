import * as React from "react";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { Element } from "nav-frontend-typografi";
import BlockContent from "../utils/BlockContent";
import { useTextContext } from "../utils/TextProvider";

export interface Notifikasjon {
  title?: string;
  innhold?: typeof BlockContent[];
}

function Notifikasjoner() {
  const { notifikasjoner } = useTextContext();

  if (!notifikasjoner?.length) {
    return null;
  }

  console.log(notifikasjoner);

  return (
    <div>
      {notifikasjoner.map((notifikasjon, i) => (
        <AlertStripeInfo key={i}>
          <Element>{notifikasjon.title}</Element>
          {notifikasjon.innhold && <BlockContent blocks={notifikasjon.innhold} />}
        </AlertStripeInfo>
      ))}
    </div>
  );
}

export default Notifikasjoner;
