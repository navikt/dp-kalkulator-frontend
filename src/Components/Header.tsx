import React from "react";
import { ReactComponent as HeaderImage } from "../Images/header.svg";
import { useTextContext } from "../utils/TextProvider";
import { Heading } from "@navikt/ds-react";

const Header = () => {
  const text = useTextContext();
  return (
    <div className="dagpengekalkulator">
      <div className="content kalkulator-content">
        <div className="text">
          <Heading size={"large"}>{text.title}</Heading>
        </div>
        <div role="presentation" className="header__svgContainer">
          <HeaderImage />
        </div>
      </div>
    </div>
  );
};
export default Header;
