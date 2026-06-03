import { describe, expect, it } from "vitest";
import { hentBarnetillegg, hentMaanederATrekkeFra } from "~/utils/dato.utils";

describe("hentMaanederATrekkeFra", () => {
  it("returnerer 2 når dato er innenfor de første fem dagene", () => {
    expect(hentMaanederATrekkeFra(new Date("2026-06-05"))).toBe(2);
  });

  it("returnerer 1 når dato er en fridag senere i måneden", () => {
    expect(hentMaanederATrekkeFra(new Date("2026-05-17"))).toBe(1);
  });

  it("returnerer 1 for en vanlig dag midt i måneden", () => {
    expect(hentMaanederATrekkeFra(new Date("2026-06-15"))).toBe(1);
  });
});

describe("hentBarnetillegg", () => {
  it("beregner barnetillegg basert på årstall", () => {
    expect(hentBarnetillegg(new Date("2026-01-01"))).toBe(38);
  });
});
