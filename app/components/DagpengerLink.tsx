import { BodyLong, BodyShort, HStack, Link, VStack } from "@navikt/ds-react";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";
import { DagpengerIkon } from "./DagpengerIkon";

export function DagpengerLink() {
  const { language } = useTypedRouteLoaderData("root");
  const språk = language === "en" ? "en" : "nb";

  if (språk === "en") {
    return (
      <Link href="https://www.nav.no/dagpenger/en" className="dagpenger-link">
        <DagpengerIkon aria-hidden />
        <VStack gap="space-16">
          <BodyShort className="lenke-tittel">Unemployment benefit (dagpenger)</BodyShort>
        </VStack>
      </Link>
    );
  }

  return (
    <Link href="https://www.nav.no/dagpenger" className="dagpenger-link">
      <DagpengerIkon aria-hidden />
      <VStack gap="space-16">
        <BodyShort className="lenke-tittel">Dagpenger</BodyShort>
        <BodyLong className="lenke-tekst">
          Det du må vite når du skal søke, ettersende eller klage, og hva du må gjøre når du mottar
          dagpenger.
        </BodyLong>
      </VStack>
    </Link>
  );
}
