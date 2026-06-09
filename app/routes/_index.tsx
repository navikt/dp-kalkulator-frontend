import { Box, Button, Label, Radio, RadioGroup, Select, TextField, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { subMonths } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { DagpengerLink } from "~/components/DagpengerLink";
import { Header } from "~/components/Header";
import { HvilkenInntektsperiodeBorDuVelge } from "~/components/HvilkenInntektsperiodeBorDuVelge";
import { HvorforViSporOmForsorgerBarn } from "~/components/HvorforViSporOmForsorgerBarn";
import { InntekterSomAvgjorDagpenger } from "~/components/InntekterSomAvgjorDagpenger";
import { NegativResultatBoks } from "~/components/NegativResultatBoks";
import { PositivResultatBoks } from "~/components/PositivResultatBoks";
import { useOversettelser } from "~/hooks/useOversettelser";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";
import { hentBarnetillegg, hentMaanederATrekkeFra } from "~/utils/dato.utils";
import {
  beregnDagpengerResultat,
  formaterMaanedOgAar,
  GRUNNBELOP,
  Inntektsperiode,
  SkjemaTilstand,
  tilGVerdi,
  tilKR
} from "~/utils/kalkulator.utils";
import { lagKalkulatorSkjema } from "~/utils/validering";

export default function IndexRoute() {
  const rootData = useTypedRouteLoaderData("root");
  const { t } = useOversettelser();
  const språk = rootData.language === "en" ? "en" : "nb";
  const tusenSeparator = språk === "en" ? "," : " ";
  const inputValutaPostfix = språk === "en" ? " NOK" : " kr";
  const [visResultat, setVisResultat] = useState(false);
  const resultatRef = useRef<HTMLDivElement>(null);
  const kalkulatorSkjema = lagKalkulatorSkjema(språk);

  const skjemaDefaultValues: SkjemaTilstand = {
    inntektsperiode: "12",
    inntektSiste12Maaneder: null,
    inntektSiste36MaanederIAar: null,
    inntektSiste36MaanederIFjor: null,
    inntektSiste36MaanederToAarSiden: null,
    forsorgerBarn: null,
    antallBarn: null
  };

  const skjema = useForm({
    schema: kalkulatorSkjema,
    defaultValues: skjemaDefaultValues,
    submitSource: "state",
    handleSubmit: async () => {
      setVisResultat(true);
    },
    onInvalidSubmit: async () => {
      setVisResultat(false);
    }
  });

  const skjemaData = skjema.value();

  useEffect(() => {
    if (skjemaData.forsorgerBarn === "nei" && skjemaData.antallBarn !== null) {
      skjema.setValue("antallBarn", null);
    }
  }, [skjemaData.forsorgerBarn, skjemaData.antallBarn, skjema]);

  useEffect(() => {
    if (!visResultat || !resultatRef.current) {
      return;
    }

    const scrollingType = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    resultatRef.current.scrollIntoView({
      behavior: scrollingType ? "auto" : "smooth",
      block: "start"
    });
  }, [visResultat]);

  const barnetilleggVerdi = hentBarnetillegg(new Date());
  const månedÅTrekkeFra = hentMaanederATrekkeFra(new Date());
  const sisteMånedMedUtbetaling = subMonths(new Date(), månedÅTrekkeFra);

  const periode12 = {
    from: subMonths(sisteMånedMedUtbetaling, 11),
    to: sisteMånedMedUtbetaling
  };

  const periode36 = [
    {
      key: "inntektSiste36MaanederIAar" as const,
      from: subMonths(sisteMånedMedUtbetaling, 11),
      to: sisteMånedMedUtbetaling
    },
    {
      key: "inntektSiste36MaanederIFjor" as const,
      from: subMonths(sisteMånedMedUtbetaling, 23),
      to: subMonths(sisteMånedMedUtbetaling, 12)
    },
    {
      key: "inntektSiste36MaanederToAarSiden" as const,
      from: subMonths(sisteMånedMedUtbetaling, 35),
      to: subMonths(sisteMånedMedUtbetaling, 24)
    }
  ];

  const beregningResultat = useMemo(
    () =>
      beregnDagpengerResultat({
        inntektsperiode: skjemaData.inntektsperiode,
        inntektSiste12Maaneder: skjemaData.inntektSiste12Maaneder ?? 0,
        inntektSiste36MaanederIAar: skjemaData.inntektSiste36MaanederIAar ?? 0,
        inntektSiste36MaanederIFjor: skjemaData.inntektSiste36MaanederIFjor ?? 0,
        inntektSiste36MaanederToAarSiden: skjemaData.inntektSiste36MaanederToAarSiden ?? 0,
        antallBarn: skjemaData.forsorgerBarn === "ja" ? (skjemaData.antallBarn ?? 0) : 0,
        gVerdi: GRUNNBELOP,
        barnetilleggVerdi: barnetilleggVerdi
      }),
    [skjemaData, barnetilleggVerdi]
  );

  return (
    <main id="maincontent">
      <VStack gap="space-16">
        <Header />
        <form
          {...skjema.getFormProps()}
          onChangeCapture={() => {
            setVisResultat(false);
          }}
          onKeyDownCapture={(event) => {
            const target = event.target as HTMLInputElement;
            if (
              target.type === "number" &&
              (event.key === "ArrowUp" || event.key === "ArrowDown")
            ) {
              event.preventDefault();
            }
          }}
        >
          <VStack gap="space-36" align="start">
            <Box>
              <RadioGroup
                name="inntektsperiode"
                legend={t("inntektsperiode.legende")}
                value={skjemaData.inntektsperiode}
                onChange={(value) => {
                  skjema.setValue("inntektsperiode", value as Inntektsperiode);
                }}
              >
                <Radio value="12">{t("inntektsperiode.siste12Maaneder")}</Radio>
                <Radio value="36">{t("inntektsperiode.siste36Maaneder")}</Radio>
              </RadioGroup>
              <HvilkenInntektsperiodeBorDuVelge
                belop12={tilKR(tilGVerdi(1.5), språk)}
                belop36={tilKR(tilGVerdi(3), språk)}
              />
            </Box>

            <VStack gap="space-16" align="start">
              {skjemaData.inntektsperiode === "12" && (
                <NumericFormat
                  customInput={TextField}
                  id="inntektSiste12Maaneder"
                  error={skjema.error("inntektSiste12Maaneder") ?? undefined}
                  label={t("inntektSiste12Maaneder.etikett")}
                  description={t("inntektSiste12Maaneder.periodeBeskrivelse", {
                    fra: formaterMaanedOgAar(periode12.from, språk),
                    til: formaterMaanedOgAar(periode12.to, språk)
                  })}
                  value={skjemaData.inntektSiste12Maaneder ?? ""}
                  onValueChange={({ floatValue }: { floatValue?: number }) => {
                    skjema.setValue("inntektSiste12Maaneder", floatValue ?? null);
                  }}
                  thousandSeparator={tusenSeparator}
                  suffix={inputValutaPostfix}
                  decimalScale={0}
                  allowNegative={false}
                  inputMode="numeric"
                />
              )}

              {skjemaData.inntektsperiode === "36" && (
                <VStack gap="space-8">
                  <Label spacing>{t("inntektSiste36Maaneder.etikett")}</Label>
                  <VStack gap="space-16">
                    {periode36.map((periode) => (
                      <NumericFormat
                        customInput={TextField}
                        label=""
                        id={periode.key}
                        error={skjema.error(periode.key) ?? undefined}
                        description={t("inntektSiste36Maaneder.periodeBeskrivelse", {
                          fra: formaterMaanedOgAar(periode.from, språk),
                          til: formaterMaanedOgAar(periode.to, språk)
                        })}
                        value={skjemaData[periode.key] ?? ""}
                        onValueChange={({ floatValue }: { floatValue?: number }) => {
                          skjema.setValue(periode.key, floatValue ?? null);
                        }}
                        thousandSeparator={tusenSeparator}
                        suffix={inputValutaPostfix}
                        decimalScale={0}
                        allowNegative={false}
                        inputMode="numeric"
                      />
                    ))}
                  </VStack>
                </VStack>
              )}

              <InntekterSomAvgjorDagpenger />
            </VStack>

            <VStack gap="space-16" align="start">
              <RadioGroup
                name="forsorgerBarn"
                legend={t("forsorgerBarn.legende")}
                error={skjema.error("forsorgerBarn") ?? undefined}
                value={skjemaData.forsorgerBarn === null ? undefined : skjemaData.forsorgerBarn}
                onChange={(value) => {
                  skjema.setValue("forsorgerBarn", value as "ja" | "nei");
                }}
              >
                <Radio value="ja">{t("forsorgerBarn.ja")}</Radio>
                <Radio value="nei">{t("forsorgerBarn.nei")}</Radio>
              </RadioGroup>

              <HvorforViSporOmForsorgerBarn />
            </VStack>

            {skjemaData.forsorgerBarn === "ja" && (
              <Box>
                <Select
                  name="antallBarn"
                  error={skjema.error("antallBarn") ?? undefined}
                  label={t("antallBarn.etikett")}
                  value={skjemaData.antallBarn ?? ""}
                  onChange={(event) => {
                    const value = event.target.value;
                    skjema.setValue("antallBarn", value === "" ? null : Number(value));
                  }}
                >
                  <option value="">{t("antallBarn.velgAntall")}</option>
                  {Array.from({ length: 10 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </Select>
              </Box>
            )}

            <Button type="submit">{t("skjema.beregn")}</Button>

            {visResultat && (
              <div ref={resultatRef} className="resultatSeksjon" aria-live="assertive">
                {beregningResultat.harForLavInntekt && (
                  <NegativResultatBoks
                    minsteInntekt12={tilKR(tilGVerdi(1.5), språk)}
                    minsteInntekt36={tilKR(tilGVerdi(3), språk)}
                  />
                )}

                {!beregningResultat.harForLavInntekt && (
                  <PositivResultatBoks
                    resultat={beregningResultat}
                    antallBarn={skjemaData.antallBarn ?? 0}
                  />
                )}
              </div>
            )}
          </VStack>
        </form>

        <DagpengerLink />
      </VStack>
    </main>
  );
}
