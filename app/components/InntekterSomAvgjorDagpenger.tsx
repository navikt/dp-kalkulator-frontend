import { BodyShort, Box, List, ReadMore, VStack } from "@navikt/ds-react";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";

export function InntekterSomAvgjorDagpenger() {
  const rootData = useTypedRouteLoaderData("root");
  const språk = rootData.language === "en" ? "en" : "nb";

  if (språk === "en") {
    return (
      <ReadMore header="What types of income determine how much you can get?">
        <VStack gap="space-16">
          <Box>
            <BodyShort spacing>
              We use the following types of income to calculate your unemployment benefit amount:
            </BodyShort>
            <List as="ul">
              <List.Item>Salary</List.Item>
              <List.Item>Sickness benefit</List.Item>
              <List.Item>Care benefit</List.Item>
              <List.Item>Attendance allowance</List.Item>
              <List.Item>Training allowance</List.Item>
              <List.Item>Pregnancy benefit</List.Item>
              <List.Item>Parental benefit in connection with birth or adoption</List.Item>
              <List.Item>Unemployment benefit</List.Item>
            </List>
          </Box>
          <Box>
            <BodyShort spacing>These incomes are not considered as salary:</BodyShort>
            <List as="ul">
              <List.Item>Self-employment income</List.Item>
              <List.Item>Work assessment allowance (AAP)</List.Item>
            </List>
          </Box>
        </VStack>
      </ReadMore>
    );
  }

  return (
    <ReadMore header="Disse inntektene avgjør hvor mye du kan få">
      <VStack gap="space-16">
        <Box>
          <BodyShort spacing>
            Inntekten du har oppgitt i kalkulatoren må være arbeidsinntekt:
          </BodyShort>
          <List as="ul">
            <List.Item>Arbeidsinntekt</List.Item>
            <List.Item>Sykepenger</List.Item>
            <List.Item>Omsorgspenger</List.Item>
            <List.Item>Pleiepenger</List.Item>
            <List.Item>Opplæringspenger</List.Item>
            <List.Item>Svangerskapspenger</List.Item>
            <List.Item>Foreldrepenger ved fødsel og adopsjon</List.Item>
            <List.Item>Dagpenger</List.Item>
          </List>
        </Box>
        <Box>
          <BodyShort spacing>Disse inntektene regnes ikke som arbeidsinntekt:</BodyShort>
          <List as="ul">
            <List.Item>Inntekt du har som selvstendig næringsdrivende</List.Item>
            <List.Item>Arbeidsavklaringspenger</List.Item>
          </List>
        </Box>
      </VStack>
    </ReadMore>
  );
}
