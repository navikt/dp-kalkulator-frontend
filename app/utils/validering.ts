import { z } from "zod";

export function lagKalkulatorSkjema(erEngelsk: boolean) {
  return z
    .object({
      inntektsperiode: z.enum(["12", "36"]),
      inntektSiste12Maaneder: z.number().nullable(),
      inntektSiste36MaanederIAar: z.number().nullable(),
      inntektSiste36MaanederIFjor: z.number().nullable(),
      inntektSiste36MaanederToAarSiden: z.number().nullable(),
      forsorgerBarn: z.enum(["ja", "nei"]).nullable(),
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
      if (values.inntektsperiode === "12" && values.inntektSiste12Maaneder === null) {
        ctx.addIssue({
          code: "custom",
          path: ["inntektSiste12Maaneder"],
          message: erEngelsk ? "You have to write an income" : "Du må skrive inn inntekt"
        });
      }

      if (values.inntektsperiode === "36") {
        if (values.inntektSiste36MaanederIAar === null) {
          ctx.addIssue({
            code: "custom",
            path: ["inntektSiste36MaanederIAar"],
            message: erEngelsk ? "You have to write an income" : "Du må skrive inn inntekt"
          });
        }

        if (values.inntektSiste36MaanederIFjor === null) {
          ctx.addIssue({
            code: "custom",
            path: ["inntektSiste36MaanederIFjor"],
            message: erEngelsk ? "You have to write an income" : "Du må skrive inn inntekt"
          });
        }

        if (values.inntektSiste36MaanederToAarSiden === null) {
          ctx.addIssue({
            code: "custom",
            path: ["inntektSiste36MaanederToAarSiden"],
            message: erEngelsk ? "You have to write an income" : "Du må skrive inn inntekt"
          });
        }
      }

      if (values.forsorgerBarn === null) {
        ctx.addIssue({
          code: "custom",
          path: ["forsorgerBarn"],
          message: erEngelsk
            ? "You have to say if you provide for children under the age of 18"
            : "Du må svare på om du forsørger barn under 18 år"
        });
      }

      if (values.forsorgerBarn === "ja" && values.antallBarn === null) {
        ctx.addIssue({
          code: "custom",
          path: ["antallBarn"],
          message: erEngelsk ? "You have to select an amount" : "Du må velge antall barn"
        });
      }
    });
}
