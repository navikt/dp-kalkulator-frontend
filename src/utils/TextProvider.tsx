import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import sanityClient from "../client";

const initialValue = {
  title: "",
  samtykke: [] as any[],
  negativeresponse: [] as any[],
  positiveresponse: [] as any[],
  fortsettknapp: "",
  tilbake: "",
  loadingmessage: "",
};
const TextContext = createContext(initialValue);

export const useTextContext = () => useContext(TextContext);

export default function TextProvider(props: { children: ReactNode }) {
  const [tekst, setTekst] = useState(initialValue);
  useEffect(() => {
    sanityClient.fetch(`*[_id == "dagpengekalkulator"][0]`).then(setTekst).catch(console.error);
  }, []);

  return <TextContext.Provider value={tekst}>{props.children}</TextContext.Provider>;
}
