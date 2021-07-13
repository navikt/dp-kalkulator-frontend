import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import sanityClient from "../client";
import { Notifikasjon } from "../Components/Notifikasjoner";
import localizeSanityContent from "./localizeSanityContent";

const initialValue = {
  _id: "",
  title: "",
  samtykke: [] as any[],
  negativeresponse: [] as any[],
  positiveresponse: [] as any[],
  fortsettknapp: "",
  notifikasjoner: [] as Notifikasjon[],
  tilbake: "",
  loadingmessage: "",
};
const TextContext = createContext(initialValue);

export const useTextContext = () => useContext(TextContext);

export default function TextProvider(props: { children: ReactNode }) {
  const [tekst, setTekst] = useState(initialValue);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "dagpengekalkulator"]{
        ...,
    'notifikasjoner': *[_type == "notifikasjon" && visPaaKalkulator==true],
    }`
      )
      .then((result) => {
        const draft = result.find((it: typeof initialValue) => it._id.includes("drafts."));
        setTekst(draft || result[0]);
      })
      .catch(console.error);
  }, []);

  return <TextContext.Provider value={localizeSanityContent(tekst)}>{props.children}</TextContext.Provider>;
}
