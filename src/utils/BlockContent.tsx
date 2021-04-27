import React from "react";
// @ts-ignore
import SanityBlockContent from "@sanity/block-content-to-react";
import { VariabelSerializer } from "./VariabelSerializer";
import { BlockRenderer } from "./BlockSerializer";
import Lenke from "nav-frontend-lenker";
import { logLenkeKlikk } from "../lib/tracking";

const serializers = {
  types: {
    variabel: VariabelSerializer,
    block: BlockRenderer,
  },
  marks: {
    link: (props: any) => (
      <Lenke href={props.mark.href} onClick={() => logLenkeKlikk(props.mark.href)}>
        {props.children}
      </Lenke>
    ),
  },
};

export default function BlockContent(props: { blocks: any[] }) {
  return <SanityBlockContent blocks={props.blocks} serializers={serializers} />;
}
