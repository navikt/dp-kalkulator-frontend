import React from "react";
import NavFrontendSpinner from "nav-frontend-spinner";
import { Normaltekst } from "nav-frontend-typografi";
import { useTextContext } from "../utils/TextProvider";

const LoadingMessage = (props) => {
  const text = useTextContext();
  return (
    <div className="flex center vertical textcenter">
      <NavFrontendSpinner {...props} />
      <Normaltekst>{text.loadingmessage}</Normaltekst>
    </div>
  );
};
export default LoadingMessage;
