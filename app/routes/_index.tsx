import { Box, Button, Label, Radio, RadioGroup, Select, TextField, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { subMonths } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { DagpengerLink } from "~/components/DagpengerLink";
import { Header } from "~/components/Header";
import { HvilkenInntektsperiodeBørDuVelge } from "~/components/HvilkenInntektsperiodeBørDuVelge";
import { HvorforViSpørOmForsørgerBarn } from "~/components/HvorforViSpørOmForsørgerBarn";
import { InntekterSomAvgjørDagpenger } from "~/components/InntekterSomAvgjørDagpenger";
import { NegativResultatBoks } from "~/components/NegativResultatBoks";
import { PositivResultatBoks } from "~/components/PositivResultatBoks";
import { useOversettelser } from "~/hooks/useOversettelser";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";
import { hentBarnetillegg, hentMånederÅTrekkeFra } from "~/utils/dato.utils";
import {
  beregnDagpengerResultat,
  formaterMånedOgÅr,
  hentGrunnbeløp,
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
    inntektSiste12Måneder: null,
    inntektSiste36MånederIÅr: null,
    inntektSiste36MånederIFjor: null,
    inntektSiste36MånederToÅrSiden: null,
    forsørgerBarn: null,
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
    if (skjemaData.forsørgerBarn === "nei" && skjemaData.antallBarn !== null) {
      skjema.setValue("antallBarn", null);
    }
  }, [skjemaData.forsørgerBarn, skjemaData.antallBarn, skjema]);

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
  const månedÅTrekkeFra = hentMånederÅTrekkeFra(new Date());
  const sisteMånedMedUtbetaling = subMonths(new Date(), månedÅTrekkeFra);

  const periode12 = {
    from: subMonths(sisteMånedMedUtbetaling, 11),
    to: sisteMånedMedUtbetaling
  };

  const periode36 = [
    {
      key: "inntektSiste36MånederIÅr" as const,
      from: subMonths(sisteMånedMedUtbetaling, 11),
      to: sisteMånedMedUtbetaling
    },
    {
      key: "inntektSiste36MånederIFjor" as const,
      from: subMonths(sisteMånedMedUtbetaling, 23),
      to: subMonths(sisteMånedMedUtbetaling, 12)
    },
    {
      key: "inntektSiste36MånederToÅrSiden" as const,
      from: subMonths(sisteMånedMedUtbetaling, 35),
      to: subMonths(sisteMånedMedUtbetaling, 24)
    }
  ];

  const beregningResultat = useMemo(
    () =>
      beregnDagpengerResultat({
        inntektsperiode: skjemaData.inntektsperiode,
        inntektSiste12Måneder: skjemaData.inntektSiste12Måneder ?? 0,
        inntektSiste36MånederIÅr: skjemaData.inntektSiste36MånederIÅr ?? 0,
        inntektSiste36MånederIFjor: skjemaData.inntektSiste36MånederIFjor ?? 0,
        inntektSiste36MånederToÅrSiden: skjemaData.inntektSiste36MånederToÅrSiden ?? 0,
        antallBarn: skjemaData.forsørgerBarn === "ja" ? (skjemaData.antallBarn ?? 0) : 0,
        gVerdi: hentGrunnbeløp(),
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
                <Radio value="12">{t("inntektsperiode.siste12Måneder")}</Radio>
                <Radio value="36">{t("inntektsperiode.siste36Måneder")}</Radio>
              </RadioGroup>
              <HvilkenInntektsperiodeBørDuVelge
                beløp12={tilKR(tilGVerdi(1.5), språk)}
                beløp36={tilKR(tilGVerdi(3), språk)}
              />
            </Box>

            <VStack gap="space-16" align="start">
              {skjemaData.inntektsperiode === "12" && (
                <NumericFormat
                  customInput={TextField}
                  id="inntektSiste12Måneder"
                  error={skjema.error("inntektSiste12Måneder") ?? undefined}
                  label={t("inntektSiste12Måneder.etikett")}
                  description={t("inntektSiste12Måneder.periodeBeskrivelse", {
                    fra: formaterMånedOgÅr(periode12.from, språk),
                    til: formaterMånedOgÅr(periode12.to, språk)
                  })}
                  value={skjemaData.inntektSiste12Måneder ?? ""}
                  onValueChange={({ floatValue }: { floatValue?: number }) => {
                    skjema.setValue("inntektSiste12Måneder", floatValue ?? null);
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
                  <Label spacing>{t("inntektSiste36Måneder.etikett")}</Label>
                  <VStack gap="space-16">
                    {periode36.map((periode) => (
                      <NumericFormat
                        customInput={TextField}
                        label=""
                        id={periode.key}
                        error={skjema.error(periode.key) ?? undefined}
                        description={t("inntektSiste36Måneder.periodeBeskrivelse", {
                          fra: formaterMånedOgÅr(periode.from, språk),
                          til: formaterMånedOgÅr(periode.to, språk)
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

              <InntekterSomAvgjørDagpenger />
            </VStack>

            <VStack gap="space-16" align="start">
              <RadioGroup
                name="forsørgerBarn"
                legend={t("forsørgerBarn.legende")}
                error={skjema.error("forsørgerBarn") ?? undefined}
                value={skjemaData.forsørgerBarn === null ? undefined : skjemaData.forsørgerBarn}
                onChange={(value) => {
                  skjema.setValue("forsørgerBarn", value as "ja" | "nei");
                }}
              >
                <Radio value="ja">{t("forsørgerBarn.ja")}</Radio>
                <Radio value="nei">{t("forsørgerBarn.nei")}</Radio>
              </RadioGroup>

              <HvorforViSpørOmForsørgerBarn />
            </VStack>

            {skjemaData.forsørgerBarn === "ja" && (
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
