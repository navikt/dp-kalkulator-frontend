import React from "react";
import "./BlockContent.less";
// @ts-ignore
import SanityBlockContent from "@sanity/block-content-to-react";
import { VariabelSerializer } from "./VariabelSerializer";

const serializers = {
  types: {
    variabel: VariabelSerializer,
  },
};

export default function BlockContent(props: { blocks: any[] }) {
  return (
    <div className="blockContentStyle typo-normal">
      <SanityBlockContent blocks={props.blocks} serializers={serializers} />
    </div>
  );
}
