import React from "react";
// @ts-ignore
import SanityBlockContent from "@sanity/block-content-to-react";
import { BodyLong, Heading } from "@navikt/ds-react";

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
      return (
        <Heading level="2" size={"medium"} spacing>
          {props.children}
        </Heading>
      );
    case "normal":
      return <BodyLong>{props.children}</BodyLong>;
    default:
      return SanityBlockContent.defaultSerializers.types.block(props);
  }
};
