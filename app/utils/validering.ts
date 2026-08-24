import { z } from "zod";

export function lagKalkulatorSkjema(språk: "nb" | "en") {
  const erEngelsk = språk === "en";

  return z
    .object({
      inntektsperiode: z.enum(["12", "36"]),
      inntektSiste12Måneder: z.number().nullable(),
      inntektSiste36MånederIÅr: z.number().nullable(),
      inntektSiste36MånederIFjor: z.number().nullable(),
      inntektSiste36MånederToÅrSiden: z.number().nullable(),
      forsørgerBarn: z.enum(["ja", "nei"]).nullable(),
      antallBarn: z.preprocess((value) => {
        if (value === "" || value === null || value === undefined) {
          return null;
        }

        if (typeof value === "string") {
          const parsed = Number(value);
          return Number.isFinite(parsed) ? parsed : value;
        }

        return value;
      }, z.number().nullable())
    })
    .superRefine((values, ctx) => {
      if (values.inntektsperiode === "12" && values.inntektSiste12Måneder === null) {
        ctx.addIssue({
          code: "custom",
          path: ["inntektSiste12Måneder"],
          message: erEngelsk ? "You have to write an income" : "Du må skrive inn inntekt"
        });
      }

      if (values.inntektsperiode === "36") {
        if (values.inntektSiste36MånederIÅr === null) {
          ctx.addIssue({
            code: "custom",
            path: ["inntektSiste36MånederIÅr"],
            message: erEngelsk ? "You have to write an income" : "Du må skrive inn inntekt"
          });
        }

        if (values.inntektSiste36MånederIFjor === null) {
          ctx.addIssue({
            code: "custom",
            path: ["inntektSiste36MånederIFjor"],
            message: erEngelsk ? "You have to write an income" : "Du må skrive inn inntekt"
          });
        }

        if (values.inntektSiste36MånederToÅrSiden === null) {
          ctx.addIssue({
            code: "custom",
            path: ["inntektSiste36MånederToÅrSiden"],
            message: erEngelsk ? "You have to write an income" : "Du må skrive inn inntekt"
          });
        }
      }

      if (values.forsørgerBarn === null) {
        ctx.addIssue({
          code: "custom",
          path: ["forsørgerBarn"],
          message: erEngelsk
            ? "You have to say if you provide for children under the age of 18"
            : "Du må svare på om du forsørger barn under 18 år"
        });
      }

      if (values.forsørgerBarn === "ja" && values.antallBarn === null) {
        ctx.addIssue({
          code: "custom",
          path: ["antallBarn"],
          message: erEngelsk ? "You have to select an amount" : "Du må velge antall barn"
        });
      }
    });
}
