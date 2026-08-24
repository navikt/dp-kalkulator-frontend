import { format } from "date-fns";
import { enGB, nb } from "date-fns/locale";

export function hentGrunnbeløp(): number {
  return 136549;
}

export type Inntektsperiode = "12" | "36";

export type KalkulatorInput = {
  inntektsperiode: Inntektsperiode;
  inntektSiste12Måneder: number;
  inntektSiste36MånederIÅr: number;
  inntektSiste36MånederIFjor: number;
  inntektSiste36MånederToÅrSiden: number;
  antallBarn: number;
  gVerdi: number;
  barnetilleggVerdi: number;
};

export type KalkulatorResult = {
  harForLavInntekt: boolean;
  inntekt: number;
  inntektForBeregning: number;
  dagpengerMellom0Og6G: number;
  dagpengerPer14Dager: number;
  barnetilleggPer14Dager: number;
  totalPer14Dager: number;
};

export type SkjemaTilstand = {
  inntektsperiode: Inntektsperiode;
  inntektSiste12Måneder: number | null;
  inntektSiste36MånederIÅr: number | null;
  inntektSiste36MånederIFjor: number | null;
  inntektSiste36MånederToÅrSiden: number | null;
  forsørgerBarn: "ja" | "nei" | null;
  antallBarn: number | null;
};

function tak6G(beløp: number, gVerdi: number): number {
  return Math.min(beløp, 6 * gVerdi);
}

function hentTotalInntektSiste36Måneder(grunnlag: KalkulatorInput): number {
  return (
    grunnlag.inntektSiste36MånederIÅr +
    grunnlag.inntektSiste36MånederIFjor +
    grunnlag.inntektSiste36MånederToÅrSiden
  );
}

function hentSnittInntektSiste36MånederMedTak6G(grunnlag: KalkulatorInput): number {
  return (
    (tak6G(grunnlag.inntektSiste36MånederIÅr, grunnlag.gVerdi) +
      tak6G(grunnlag.inntektSiste36MånederIFjor, grunnlag.gVerdi) +
      tak6G(grunnlag.inntektSiste36MånederToÅrSiden, grunnlag.gVerdi)) /
    3
  );
}

export function beregnDagpengerResultat(grunnlag: KalkulatorInput): KalkulatorResult {
  const inntekt =
    grunnlag.inntektsperiode === "12"
      ? grunnlag.inntektSiste12Måneder
      : hentTotalInntektSiste36Måneder(grunnlag);

  const inntektForBeregning =
    grunnlag.inntektsperiode === "12"
      ? grunnlag.inntektSiste12Måneder
      : hentSnittInntektSiste36MånederMedTak6G(grunnlag);

  const minsteInntektBasertPaPeriodeLengde = grunnlag.inntektsperiode === "12" ? 1.5 : 3;
  const harForLavInntekt = inntekt < minsteInntektBasertPaPeriodeLengde * grunnlag.gVerdi;

  const inntektMellom0Og6G = Math.max(0, Math.min(inntektForBeregning, 6 * grunnlag.gVerdi));
  const dagpengerMellom0Og6G = inntektMellom0Og6G * 0.624;
  const dagpengerPer14Dager = (dagpengerMellom0Og6G / 52) * 2;
  const barnetilleggPer14Dager = grunnlag.barnetilleggVerdi * 2 * 5 * grunnlag.antallBarn;
  const totalPer14Dager = dagpengerPer14Dager + barnetilleggPer14Dager;

  return {
    harForLavInntekt,
    inntekt,
    inntektForBeregning,
    dagpengerMellom0Og6G,
    dagpengerPer14Dager,
    barnetilleggPer14Dager,
    totalPer14Dager
  };
}

export function tilKR(verdi: number, språk: "nb" | "en" = "nb"): string {
  const locale = språk === "en" ? "en-GB" : "nb-NO";
  const valuta = språk === "en" ? "NOK" : "kr";
  return `${Math.round(verdi).toLocaleString(locale)} ${valuta}`;
}

export function tilGVerdi(multiplum: number): number {
  return multiplum * hentGrunnbeløp();
}

export function formaterMånedOgÅr(dato: Date, språk: "nb" | "en" = "nb"): string {
  const locale = språk === "en" ? enGB : nb;
  return format(dato, "LLLL yyyy", { locale });
}

export function tilTall(verdi: string): number | null {
  if (verdi.trim() === "") {
    return null;
  }

  const konvertert = Number(verdi);
  return Number.isFinite(konvertert) ? konvertert : null;
}
