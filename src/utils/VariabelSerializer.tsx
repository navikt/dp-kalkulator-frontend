import { usePositiveResponseContext } from "../Kalkulator/PositiveResponse";

interface Props {
  node: {
    data: string;
  };
}

export const VariabelSerializer = (props: Props) => {
  const context = usePositiveResponseContext();
  switch (props.node.data) {
    case "Ukesats":
      return context.ukesats;
    case "Antall Uker":
      return context.periodeAntallUker;
    default:
      throw Error("Ukjent variabel: " + props.node.data);
  }
};
