import { BodyLong, ReadMore } from "@navikt/ds-react";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";

export function HvorforViSporOmForsorgerBarn() {
  const { language } = useTypedRouteLoaderData("root");
  const språk = language === "en" ? "en" : "nb";

  if (språk === "en") {
    return (
      <ReadMore header="Why do we ask if you support children?">
        <BodyLong>
          If you support children under 18, you receive a child supplement of 38 NOK per child, 5
          days a week. This equals 190 NOK per week per child. If you support the child, you are
          entitled to the child supplement even if the child does not live with you. <br />
          <br /> The child must live in Norway, another EEA country, Switzerland, or the United
          Kingdom. If the child stays outside these areas for more than 90 days during a 12-month
          period, you will no longer receive the child supplement.
        </BodyLong>
      </ReadMore>
    );
  }

  return (
    <ReadMore header="Hvorfor spør vi om du forsørger barn?">
      <BodyLong>
        Forsørger du barn under 18 år, får du et barnetillegg på 38 kroner per barn, 5 dager i uken.
        Dette utgjør 190 kroner i uken per barn. Hvis du forsørger barnet har du rett til
        barnetillegg selv om barnet ikke bor hos deg. <br />
        <br /> Barnet må bo i Norge, et annet EØS-land, Sveits eller Storbritannia. Hvis barnet i
        løpet av 12 måneder oppholder seg utenfor disse områdene i mer enn 90 dager, vil du ikke
        lenger få barnetillegg.
      </BodyLong>
    </ReadMore>
  );
}
