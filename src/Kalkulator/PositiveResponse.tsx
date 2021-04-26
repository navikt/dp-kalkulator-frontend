import React, { createContext, useContext } from "react";
import BlockContent from "../utils/BlockContent";
import { useTextContext } from "../utils/TextProvider";

const initialValue = {
  ukesats: NaN,
  periodeAntallUker: NaN,
};

const Context = createContext(initialValue);
export const usePositiveResponseContext = () => useContext(Context);

type Props = typeof initialValue;

export const PositiveResponse = (props: Props) => {
  const text = useTextContext();
  console.log(text.apierrors);
  return (
    <Context.Provider value={props}>
      <BlockContent blocks={text.positiveresponse} />
    </Context.Provider>
  );
};
