import { BodyLong, Heading, InfoCard, Link, VStack } from "@navikt/ds-react";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";
import { InformationSquareIcon } from "@navikt/aksel-icons";

interface INegativResultatBoks {
  minsteInntekt12: string;
  minsteInntekt36: string;
}

export function NegativResultatBoks({ minsteInntekt12, minsteInntekt36 }: INegativResultatBoks) {
  const rootData = useTypedRouteLoaderData("root");
  const språk = rootData.language === "en" ? "en" : "nb";

  if (språk === "en") {
    return (
      <VStack gap="space-16">
        <article className="negativBoks">
          <Heading level="2" size="large" className="resultatTittel" spacing>
            Your income has been too low
          </Heading>
          <BodyLong>
            You must have had an income of at least {minsteInntekt12} (1.5 G) in the last 12 months,
            or at least {minsteInntekt36} (3 G) in the last 36 months, to qualify for unemployment
            benefit.
          </BodyLong>
          <BodyLong>
            You can still send an application. If it turns out that you are not entitled to
            unemployment benefit, you can apply for{" "}
            <Link href="https://www.nav.no/okonomisk-sosialhjelp/en">financial assistance</Link>.
          </BodyLong>
        </article>

        <InfoCard data-color="info">
          <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
            <InfoCard.Title>This calculation is simply an indication</InfoCard.Title>
          </InfoCard.Header>
          <InfoCard.Content>
            We can only say for certain if you qualify for unemployment benefit after receiving all
            necessary information and processing your application.
          </InfoCard.Content>
        </InfoCard>
      </VStack>
    );
  }

  return (
    <VStack gap="space-16">
      <article className="negativBoks">
        <Heading level="2" size="large" className="resultatTittel" spacing>
          Du har hatt for lite inntekt
        </Heading>
        <BodyLong>
          Du må ha hatt en inntekt på minst {minsteInntekt12} (1,5 G) de siste 12 månedene, eller
          minst {minsteInntekt36} (3 G) de siste 36 månedene, for å ha rett til dagpenger.
        </BodyLong>
        <BodyLong>
          Husk at du kan sjekke inntekten din for både siste 12 måneder og siste 36 måneder. Du
          endrer inntektsperiode øverst i kalkulatoren.
        </BodyLong>
        <BodyLong>
          Du kan likevel sende en søknad. Viser det seg at du ikke har rett til dagpenger, kan du
          søke om <Link href="https://www.nav.no/okonomisk-sosialhjelp">økonomisk sosialhjelp</Link>
          .
        </BodyLong>
      </article>
      <InfoCard data-color="info">
        <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
          <InfoCard.Title>Kalkulatoren er kun veiledende</InfoCard.Title>
        </InfoCard.Header>
        <InfoCard.Content>
          Det er først når vi har alle opplysninger og behandler søknaden din, at vi kan vurdere om
          du har rett til dagpenger.
        </InfoCard.Content>
      </InfoCard>
    </VStack>
  );
}
