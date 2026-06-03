import { Alert, BodyLong, BodyShort, ReadMore, VStack } from "@navikt/ds-react";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";

type Props = {
  belop12: string;
  belop36: string;
};

export function HvilkenInntektsperiodeBorDuVelge({ belop12, belop36 }: Props) {
  const rootData = useTypedRouteLoaderData("root");
  const språk = rootData.language === "en" ? "en" : "nb";

  if (språk === "en") {
    return (
      <ReadMore header="Which income period should you choose?">
        <VStack gap="space-16">
          <BodyLong>
            When you apply for unemployment benefit, we choose the alternative that is best for you.
            <br />
            <br />
            If you have had an income of at least {belop12} (1.5 G) in the last 12 months, you can
            choose the last 12 months as your income period.
            <br />
            <br />
            If you have had an income of less than {belop12} in the last 12 months, but have had a
            total income of at least {belop36} (3 G) in the last 36 months, you should choose the
            last 36 months as your income period. <br />
          </BodyLong>
          <Alert variant="info">
            <BodyShort>
              If you apply for unemployment benefit before 1 June, you need to have had an income of
              at least {` ${belop12} `}(1.5 G) in the last 12 months, or at least
              {` ${belop36} `}(3 G) collectively in the last 36 months.
            </BodyShort>
          </Alert>
        </VStack>
      </ReadMore>
    );
  }

  return (
    <ReadMore header="Hvilken inntektsperiode bør du velge?">
      <VStack gap="space-16">
        <BodyLong>
          Når du søker om dagpenger velger vi det alternativet som er best for deg.
          <br />
          <br />
          Har du hatt en inntekt på minst {belop12} (1,5 G) de siste 12 månedene, kan du velge siste
          12 måneder som inntektsperiode.
          <br />
          <br />
          Har du tjent mindre enn {belop12} de siste 12 månedene, men hatt en samlet inntekt på
          minst {belop36} (3 G) de siste 36 månedene, bør du velge siste 36 måneder som
          inntektsperiode. <br />
        </BodyLong>
        <Alert variant="info">
          <BodyShort>
            Hvis du søker om dagpenger før 1. juni, må du ha tjent minst
            {` ${belop12} `}(1,5 G) de siste 12 månedene, eller minst {` ${belop36} `}(3 G) til
            sammen de siste 36 månedene.
          </BodyShort>
        </Alert>
      </VStack>
    </ReadMore>
  );
}
