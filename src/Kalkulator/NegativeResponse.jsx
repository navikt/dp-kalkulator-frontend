import React from "react";
import BlockContent from "../utils/BlockContent";
import { useTextContext } from "../utils/TextProvider";

const NegativeResponse = () => {
  const text = useTextContext();

  return <BlockContent blocks={text.negativeresponse} />;
};
export default NegativeResponse;
