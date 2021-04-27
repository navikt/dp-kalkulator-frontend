import React from "react";
// @ts-ignore
import SanityBlockContent from "@sanity/block-content-to-react";
import { Innholdstittel, Normaltekst } from "nav-frontend-typografi";

interface Props {
  node: {
    style: string;
  };
  children: any;
}

export const BlockRenderer = (props: Props) => {
  const { style = "normal" } = props.node;
  switch (style) {
    case "h2":
      return <Innholdstittel tag="h2">{props.children}</Innholdstittel>;
    case "normal":
      return <Normaltekst>{props.children}</Normaltekst>;
    default:
      return SanityBlockContent.defaultSerializers.types.block(props);
  }
};
