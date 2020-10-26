import React from "react";
import NavFrontendSpinner from "nav-frontend-spinner";
import { Normaltekst } from "nav-frontend-typografi";
import { useTranslation } from "react-i18next";

const LoadingMessage = (props) => {
  const { t } = useTranslation();
  return (
    <div className="flex center vertical textcenter">
      <NavFrontendSpinner {...props} />
      <Normaltekst>{t("LOADINGMESSAGE.INFO")}</Normaltekst>
    </div>
  );
};
export default LoadingMessage;
