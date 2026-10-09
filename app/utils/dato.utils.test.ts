import { afterEach, describe, expect, it, vi } from "vitest";
import { hentMånederÅTrekkeFra } from "~/utils/dato.utils";
import { hentBarnetillegg } from "./kalkulator.utils";

afterEach(() => {
  vi.useRealTimers();
});

describe("hentMånederÅTrekkeFra", () => {
  it("returnerer 2 når dato er innenfor de første fem dagene", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 5, 3));

    expect(hentMånederÅTrekkeFra()).toBe(2);
  });

  it("returnerer 1 når dato er en fridag senere i måneden", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 5, 16));

    expect(hentMånederÅTrekkeFra()).toBe(1);
  });

  it("returnerer 1 for en vanlig dag midt i måneden", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 5, 12));

    expect(hentMånederÅTrekkeFra()).toBe(1);
  });
});

describe("hentBarnetillegg", () => {
  it("beregner barnetillegg basert på årstall", () => {
    expect(hentBarnetillegg()).toBe(38);
  });
});
