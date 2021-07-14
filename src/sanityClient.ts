import sanityClient from "@sanity/client";
import { isProduction } from "./utils/environment";

const localStorageKey = "sanityPreview";

//dette gjøres for å kunne huske sanity parametre når bruker av cms'et som ser på preview
// blir sendt til en annen side for å logge inn med bankid for så å komme tilbake
export function getSanityConfig(): { preview: boolean; dataset: string } {
  const URLParams = new URLSearchParams(window.location.search);
  const currentLocalstorage = JSON.parse(window.localStorage.getItem(localStorageKey) || "{}");

  if (URLParams.get("preview")) {
    const preview = URLParams.get("preview") === "true";
    const dataset = URLParams.get("dataset") || "production";

    const sanityPreview = {
      preview: preview,
      dataset: dataset,
      expire: Date.now() + 60000 * 2, // legger på to minutter, som bør være nok til å logge inn og sjekke datasettene
    };

    window.localStorage.setItem(localStorageKey, JSON.stringify(sanityPreview));
    return {
      preview,
      dataset,
    };
  } else if (currentLocalstorage.expire < Date.now()) {
    window.localStorage.removeItem(localStorageKey);
    return {
      preview: false,
      dataset: "production",
    };
  } else {
    return {
      preview: currentLocalstorage.preview || false,
      dataset: currentLocalstorage.dataset || "production",
    };
  }
}

const params = getSanityConfig();

const config = {
  projectId: "rt6o382n",
  dataset: params.dataset,
  withCredentials: params.preview,
  useCdn: params.preview ? false : isProduction(),
};

export default sanityClient(config);
