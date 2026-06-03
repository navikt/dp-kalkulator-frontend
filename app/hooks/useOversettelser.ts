import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";
import { tekster } from "~/translations/translation";

type språk = "nb" | "en";
type ErstattVariabler = Record<string, string | number>;

function erstattPlaceholders(tekst: string, variabler?: ErstattVariabler): string {
  if (!variabler) {
    return tekst;
  }

  let resultat = tekst;
  for (const [nokkel, verdi] of Object.entries(variabler)) {
    resultat = resultat.replaceAll(`{${nokkel}}`, String(verdi));
  }

  return resultat;
}

export function useOversettelser() {
  const rootData = useTypedRouteLoaderData("root");
  const språk: språk = rootData.language === "en" ? "en" : "nb";

  function t(id: string, variabler?: ErstattVariabler): string {
    const entry = tekster.find((item) => item.id === id);
    if (!entry) {
      return id;
    }

    return erstattPlaceholders(entry[språk], variabler);
  }

  return {
    t
  };
}
