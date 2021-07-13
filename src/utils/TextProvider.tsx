import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import sanityClient from "../sanityClient";
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
        //henter både draft og vanlige dokumentet, slik at man kan se utkast som live previews i sanity studio cms
        const draft = result.find((it: typeof initialValue) => it._id.includes("drafts."));
        setTekst(draft || result[0]);
      })
      .catch(console.error);
  }, []);

  return <TextContext.Provider value={localizeSanityContent(tekst)}>{props.children}</TextContext.Provider>;
}
