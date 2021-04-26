import React, { useContext } from "react";
import { Sidetittel } from "nav-frontend-typografi";
import { ReactComponent as HeaderImage } from "../Images/header.svg";
import { useTextContext } from "../utils/TextProvider";

const Header = () => {
  const text = useTextContext();
  return (
    <div className="dagpengekalkulator">
      <div className="content">
        <div className="text">
          <Sidetittel>{text.title}</Sidetittel>
        </div>
        <div role="presentation" className="header__svgContainer">
          <HeaderImage />
        </div>
      </div>
    </div>
  );
};
export default Header;
