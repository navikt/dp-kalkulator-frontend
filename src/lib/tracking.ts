import amplitude from "amplitude-js";

const getApiKey = () => {
  if (window.location.hostname.includes("www.nav.no")) {
    return "b0bccdd4dd75081606ef7bcab668a7ed"; // prod
  }
  return "2f190e67f31d7e4719c5ff048ad3d3e6"; // dev
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
  logVisning({ faarDagpenger, viser: "Bruker får tilbakemelding på kalkulator om h*n får dagpenger eller ikke" });
}

export function logLenkeTrykk(aktivitet: string) {
  logAktivitet({ aktivitet });
}

export function logLenkeKlikk(href: string, children: any) {
  logAktivitet({ aktivitet: `Bruker går til ${href} etter å ha trykket på en lenke`, detteSaaBruker: children });
}

export function logAktivitet(data: object) {
  logg("dagpengekalkulator.aktivitet", { ...data });
}

export function logVisning(data: object) {
  logg("dagpengekalkulator.visning", { ...data });
}

export default tracking;
