import amplitude from "amplitude-js";

const getApiKey = () => {
  if (window.location.hostname.includes("www.nav.no")) {
    return "913768927b84cde5eac0d0d18c737561"; // prod
  }
  return "9845ded64c69cd068651cd0d968e0796"; // dev
};

const tracking = amplitude.getInstance();
tracking.init(getApiKey(), "", {
  apiEndpoint: "amplitude.nav.no/collect",
  saveEvents: false,
  includeUtm: true,
  batchEvents: false,
  includeReferrer: true,
});

function logg(eventname: string, data: object) {
  tracking.logEvent(eventname, data);
}

interface ResultatData {
  isOppfyllerInntekstkrav: boolean;
}

export function logResultat(data: ResultatData) {
  let faarDagpenger: string;
  data.isOppfyllerInntekstkrav ? (faarDagpenger = "Ja") : (faarDagpenger = "Nei");
  logVisning("Bruker får tilbakemelding på kalkulator om h*n får dagpenger eller ikke", { faarDagpenger });
}

export function logLenkeKlikk(href: string, children: any) {
  logAktivitet({ aktivitet: `Bruker går til ${href} etter å ha trykket på en lenke`, detteSaaBruker: children });
}

export function logAktivitet(data: object) {
  logg("dagpengekalkulator.aktivitet", data);
}

export function logVisning(viser: string, extraData: object) {
  logg("dagpengekalkulator.visning", { viser, ...extraData });
}

export default tracking;
