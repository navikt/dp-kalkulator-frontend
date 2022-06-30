import React from "react";
import { useTextContext } from "../utils/TextProvider";
import { BodyLong, Loader } from "@navikt/ds-react";

const LoadingMessage = () => {
  const text = useTextContext();
  return (
    <div className="flex center vertical textcenter">
      <Loader size="3xlarge" />
      <BodyLong>{text.loadingmessage}</BodyLong>
    </div>
  );
};
export default LoadingMessage;
