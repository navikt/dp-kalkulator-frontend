import React, { useState, useEffect } from "react";
import i18n from "../lib/i18n";

// Skrev om denne til en hook for å ta vare på logikken dersom vi ønsker å ta ibruk språkvelger fra dekoratøren. Så vidt jeg vet er det ikke planlagt å gjøre jobben for å støtte engelsk pr i dag, men vil ikke slette denne logikken da jeg ikke har full oversikt. Men nå som den er en hook kan jeg slette noen npm-pakker som bare var i bruk her, vi skal nå uansett ikke implementere det selv men bruke språkvelger fra nav-dekoratøren
export const useLanguage = () => {
  const [currentLanguage, setLanguage] = useState("");

  useEffect(() => {
    const { language } = i18n;
    setLanguage(language || window.localStorage.i18nextLng);
  }, []);

  const handleSetLanguage = (language) => {
    if (currentLanguage !== language) {
      setLanguage(language);
      i18n.changeLanguage(language);
    }
  };

  return {
    currentLanguage,
    handleSetLanguage,
  };
};
