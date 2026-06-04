import { InformationSquareIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Heading, InfoCard, VStack } from "@navikt/ds-react";
import { useId } from "react";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";
import { type KalkulatorResult, tilKR } from "~/utils/kalkulator.utils";

type Props = {
  resultat: KalkulatorResult;
  antallBarn: number;
};

export function PositivResultatBoks({ resultat, antallBarn }: Props) {
  const { language } = useTypedRouteLoaderData("root");
  const språk = language === "en" ? "en" : "nb";
  const resultatTittelId = useId();
  const utregningTittelId = useId();

  if (språk === "en") {
    return (
      <VStack gap="space-16">
        <article className="positivBoks" aria-labelledby={resultatTittelId}>
          <VStack gap="space-8">
            <VStack gap="space-8">
              <Heading id={resultatTittelId} level="2" size="small">
                You may get paid
              </Heading>
              <BodyShort className="stortResultat">
                {tilKR(resultat.totalPer14Dager, språk)}
              </BodyShort>
              <BodyShort>every 14 days before taxes</BodyShort>
            </VStack>

            <hr className="resultatSkillelinje" aria-hidden />
            <section aria-labelledby={utregningTittelId}>
              <Heading id={utregningTittelId} level="3" size="medium">
                How we made the calculation
              </Heading>
              <BodyLong>
                We have calculated 62.4 percent of your income up to 6 G. For you, that is
                <strong>{` ${tilKR(resultat.dagpengerMellom0Og6G, språk)}`}</strong> per year.
              </BodyLong>

              <dl className="resultatTabell">
                <dt>Unemployment benefit</dt>
                <dd>
                  <strong>{tilKR(resultat.dagpengerPer14Dager, språk)}</strong>
                </dd>
                <dt>Child supplement</dt>
                <dd>
                  <strong>{tilKR(resultat.barnetilleggPer14Dager, språk)}</strong> for{" "}
                  <strong>{antallBarn}</strong> children.
                </dd>
              </dl>
            </section>

            <hr className="resultatSkillelinje" />
            <BodyLong className="resultatTotallinje">
              In total every 14 days before taxes <br />
              <strong>
                <output>{tilKR(resultat.totalPer14Dager, språk)}</output>
              </strong>
            </BodyLong>
          </VStack>
        </article>
        <InfoCard data-color="info">
          <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
            <InfoCard.Title>The calculator is only indicative</InfoCard.Title>
          </InfoCard.Header>
          <InfoCard.Content>
            This calculation is only an indication based on you being 100 percent unemployed. When
            you apply, NAV will estimate how much unemployment benefit you may qualify for.
          </InfoCard.Content>
        </InfoCard>
      </VStack>
    );
  }

  return (
    <VStack gap="space-16">
      <article className="positivBoks" aria-labelledby={resultatTittelId}>
        <VStack gap="space-8">
          <VStack gap="space-8">
            <Heading id={resultatTittelId} level="2" size="small">
              Du kan få utbetalt
            </Heading>
            <BodyShort className="stortResultat">
              {tilKR(resultat.totalPer14Dager, språk)}
            </BodyShort>
            <BodyShort>hver 14. dag før skatt</BodyShort>
          </VStack>

          <hr className="resultatSkillelinje" />
          <section aria-labelledby={utregningTittelId}>
            <Heading id={utregningTittelId} level="3" size="medium">
              Slik er det regnet ut
            </Heading>
            <BodyLong>
              Vi har regnet ut 62,4 prosent av inntekten din opp til 6 G. For deg blir det
              <strong>{` ${tilKR(resultat.dagpengerMellom0Og6G, språk)}`}</strong> i året.
            </BodyLong>

            <dl className="resultatTabell">
              <dt>Dagpenger</dt>
              <dd>
                <strong>{tilKR(resultat.dagpengerPer14Dager, språk)}</strong>
              </dd>
              <dt>Barnetillegg</dt>
              <dd>
                <strong>{tilKR(resultat.barnetilleggPer14Dager, språk)}</strong> for{" "}
                <strong>{antallBarn}</strong> barn.
              </dd>
            </dl>
          </section>

          <hr className="resultatSkillelinje" />
          <BodyLong className="resultatTotallinje">
            Totalt hver 14. dag før skatt <br />
            <strong>
              <output>{tilKR(resultat.totalPer14Dager, språk)}</output>
            </strong>
          </BodyLong>
        </VStack>
      </article>

      <InfoCard data-color="info">
        <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
          <InfoCard.Title>Kalkulatoren er kun veiledende</InfoCard.Title>
        </InfoCard.Header>
        <InfoCard.Content>
          Dette er kun en veiledende beregning basert på at du er 100 prosent arbeidsledig. Når du
          søker vurderer Nav hvor mye du kan ha rett til i dagpenger.
        </InfoCard.Content>
      </InfoCard>
    </VStack>
  );
}
