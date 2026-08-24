import { describe, expect, it } from "vitest";
import {
  beregnDagpengerResultat,
  formaterMånedOgÅr,
  hentGrunnbeløp,
  tilGVerdi,
  tilKR,
  tilTall
} from "~/utils/kalkulator.utils";

describe("beregnDagpengerResultat", () => {
  it("returnerer avslag når inntekt siste 12 måneder er under 1,5 G", () => {
    const result = beregnDagpengerResultat({
      inntektsperiode: "12",
      inntektSiste12Måneder: 100000,
      inntektSiste36MånederIÅr: 0,
      inntektSiste36MånederIFjor: 0,
      inntektSiste36MånederToÅrSiden: 0,
      antallBarn: 0,
      gVerdi: 130160,
      barnetilleggVerdi: 38
    });

    expect(result.harForLavInntekt).toBe(true);
  });

  it("setter tak på 6 G per år ved beregning av snitt for 36 måneder", () => {
    const result = beregnDagpengerResultat({
      inntektsperiode: "36",
      inntektSiste12Måneder: 0,
      inntektSiste36MånederIÅr: 9999999,
      inntektSiste36MånederIFjor: 9999999,
      inntektSiste36MånederToÅrSiden: 9999999,
      antallBarn: 2,
      gVerdi: 100000,
      barnetilleggVerdi: 38
    });

    expect(Math.round(result.inntektForBeregning)).toBe(600000);
    expect(result.harForLavInntekt).toBe(false);
    expect(result.barnetilleggPer14Dager).toBe(760);
  });

  it("returnerer forventede verdier for gyldig grunnlag med 12 måneder", () => {
    const result = beregnDagpengerResultat({
      inntektsperiode: "12",
      inntektSiste12Måneder: 300000,
      inntektSiste36MånederIÅr: 0,
      inntektSiste36MånederIFjor: 0,
      inntektSiste36MånederToÅrSiden: 0,
      antallBarn: 1,
      gVerdi: 130160,
      barnetilleggVerdi: 38
    });

    expect(result.inntekt).toBe(300000);
    expect(result.inntektForBeregning).toBe(300000);
    expect(result.dagpengerMellom0Og6G).toBe(187200);
    expect(result.dagpengerPer14Dager).toBe(7200);
    expect(result.barnetilleggPer14Dager).toBe(380);
    expect(result.totalPer14Dager).toBe(7580);
    expect(result.harForLavInntekt).toBe(false);
  });
});

describe("tilKR", () => {
  it("avrunder tall og formatterer på norsk med kr", () => {
    const result = tilKR(1234.6);
    expect(result).toMatch(/^1(?:\s|\u00A0)235 kr$/);
  });

  it("formatterer på engelsk med NOK", () => {
    const result = tilKR(1234.6, "en");
    expect(result).toBe("1,235 NOK");
  });
});

describe("hentGrunnbeløp", () => {
  it("returnerer gjeldende grunnbeløp", () => {
    expect(hentGrunnbeløp()).toBe(136549);
  });
});

describe("tilGVerdi", () => {
  it("multipliserer med gjeldende grunnbeløp", () => {
    expect(tilGVerdi(1.5)).toBe(1.5 * hentGrunnbeløp());
  });
});

describe("formaterMånedOgÅr", () => {
  it("formatterer på norsk som standard", () => {
    expect(formaterMånedOgÅr(new Date("2026-06-15T12:00:00.000Z"))).toBe("juni 2026");
  });

  it("formatterer på engelsk når språk er en", () => {
    expect(formaterMånedOgÅr(new Date("2026-06-15T12:00:00.000Z"), "en")).toBe("June 2026");
  });
});

describe("tilTall", () => {
  it("returnerer null for tom streng og mellomrom", () => {
    expect(tilTall("")).toBeNull();
    expect(tilTall("   ")).toBeNull();
  });

  it("tolker gyldige tallstrenger", () => {
    expect(tilTall("42")).toBe(42);
    expect(tilTall("3.14")).toBe(3.14);
  });

  it("returnerer null for ugyldige tallstrenger", () => {
    expect(tilTall("abc")).toBeNull();
  });
});
