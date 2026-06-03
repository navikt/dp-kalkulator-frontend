import { BodyLong, Heading, Label, VStack } from "@navikt/ds-react";
import { KalkulatorIkon } from "~/components/KalkulatorIkon";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";

export function Header() {
  const rootData = useTypedRouteLoaderData("root");
  const språk = rootData.language === "en" ? "en" : "nb";

  if (språk === "en") {
    return (
      <VStack gap="space-8">
        <Label size="small" aria-hidden>
          Calculator
        </Label>
        <div className="heading">
          <Heading level="1" size="xlarge">
            Calculate unemployment benefit
          </Heading>
          <KalkulatorIkon aria-hidden />
        </div>
        <BodyLong>
          Fill in your income to see if you qualify for unemployment benefit. The calculation is
          only an estimate.
        </BodyLong>
        <hr className="dekorlinje" aria-hidden />
      </VStack>
    );
  }

  return (
    <VStack gap="space-8">
      <Label size="small" aria-hidden>
        Kalkulator
      </Label>
      <div className="heading">
        <Heading level="1" size="xlarge">
          Beregn dagpenger
        </Heading>
        <KalkulatorIkon aria-hidden />
      </div>
      <BodyLong>
        Fyll inn inntekten din for å se om du har rett til dagpenger. Beregningen er kun veiledende.
      </BodyLong>
      <hr className="dekorlinje" aria-hidden />
    </VStack>
  );
}
