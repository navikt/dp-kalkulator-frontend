import { format } from "date-fns";
import { enGB, nb } from "date-fns/locale";

export const GRUNNBELOP = 136549;

export type Inntektsperiode = "12" | "36";

export type KalkulatorInput = {
  inntektsperiode: Inntektsperiode;
  inntektSiste12Maaneder: number;
  inntektSiste36MaanederIAar: number;
  inntektSiste36MaanederIFjor: number;
  inntektSiste36MaanederToAarSiden: number;
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
  inntektSiste12Maaneder: number | null;
  inntektSiste36MaanederIAar: number | null;
  inntektSiste36MaanederIFjor: number | null;
  inntektSiste36MaanederToAarSiden: number | null;
  forsorgerBarn: "ja" | "nei" | null;
  antallBarn: number | null;
};

function tak6G(belop: number, gVerdi: number): number {
  return Math.min(belop, 6 * gVerdi);
}

function hentTotalInntektSiste36Maaneder(grunnlag: KalkulatorInput): number {
  return (
    grunnlag.inntektSiste36MaanederIAar +
    grunnlag.inntektSiste36MaanederIFjor +
    grunnlag.inntektSiste36MaanederToAarSiden
  );
}

function hentSnittInntektSiste36MaanederMedTak6G(grunnlag: KalkulatorInput): number {
  return (
    (tak6G(grunnlag.inntektSiste36MaanederIAar, grunnlag.gVerdi) +
      tak6G(grunnlag.inntektSiste36MaanederIFjor, grunnlag.gVerdi) +
      tak6G(grunnlag.inntektSiste36MaanederToAarSiden, grunnlag.gVerdi)) /
    3
  );
}

export function beregnDagpengerResultat(grunnlag: KalkulatorInput): KalkulatorResult {
  const inntekt =
    grunnlag.inntektsperiode === "12"
      ? grunnlag.inntektSiste12Maaneder
      : hentTotalInntektSiste36Maaneder(grunnlag);

  const inntektForBeregning =
    grunnlag.inntektsperiode === "12"
      ? grunnlag.inntektSiste12Maaneder
      : hentSnittInntektSiste36MaanederMedTak6G(grunnlag);

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
  return multiplum * GRUNNBELOP;
}

export function formaterMaanedOgAar(dato: Date, språk: "nb" | "en" = "nb"): string {
  const locale = språk === "en" ? enGB : nb;
  return format(dato, "LLLL yyyy", { locale });
}

export function tilTall(verdi: string): number | null {
  if (verdi.trim() === "") {
    return null;
  }

  const tolket = Number(verdi);
  return Number.isFinite(tolket) ? tolket : null;
}
