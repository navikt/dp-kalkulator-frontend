import React from "react";
// @ts-ignore
import SanityBlockContent from "@sanity/block-content-to-react";
import { VariabelSerializer } from "./VariabelSerializer";
import { BlockRenderer } from "./BlockSerializer";
import { logLenkeKlikk } from "../lib/tracking";
import { Link } from "@navikt/ds-react";

const serializers = {
  types: {
    variabel: VariabelSerializer,
    block: BlockRenderer,
  },
  marks: {
    link: (props: any) => (
      <Link href={props.mark.href} onClick={() => logLenkeKlikk(props.mark.href, props.children)}>
        {props.children}
      </Link>
    ),
  },
};

export default function BlockContent(props: { blocks: any[] }) {
  return <SanityBlockContent blocks={props.blocks} serializers={serializers} />;
}
