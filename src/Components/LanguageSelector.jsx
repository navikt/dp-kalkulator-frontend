import React, { useState, useEffect } from 'react';
import NavFrontendChevron from 'nav-frontend-chevron';
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button';
import i18n from '../i18n';

const NB = (
  <>
    <div className="flag">
      <svg width="25" height="18">
        <title>Flag_of_Norway</title>
        <g fill="none" fillRule="evenodd">
          <path fill="#EF2B2D" d="M0 0h25v18H0z" />
          <path fill="#FFF" d="M6.875 0h4.688v18H6.875z" />
          <path fill="#FFF" d="M0 6.9h25v4.5H0z" />
          <path fill="#002868" d="M8.125 0h2.188v18H8.125z" />
          <path fill="#002868" d="M0 7.8h25v2.4H0z" />
        </g>
      </svg>
    </div>
    <div className="language">Bokmål</div>
  </>
);

const EN = (
  <>
    <div className="flag">
      <svg width="25" height="18">
        <title>flag_united_kingdom</title>
        <g fill="none" fillRule="evenodd">
          <path fill="#00247D" d="M0 0v18h25V0z" />
          <path d="M3.209 0L25 15.69V18h-3.209L0 2.31V0h3.209zM25 2.31L3.209 18H0v-2.31L21.791 0H25v2.31z" fill="#FFF" fillRule="nonzero" />
          <path
            d="M10.36 9L0 1.54V0l12.5 9h-2.14zm4.28 0L25 16.46V18L12.5 9h2.14zm-2.14 1.54L2.14 18H0l12.5-9v1.54zm0-3.08L22.86 0H25L12.5 9V7.46z"
            fill="#CF142B"
            fillRule="nonzero"
          />
          <path fill="#FFF" fillRule="nonzero" d="M15.625 5.875H25v6.25h-9.375V18h-6.25v-5.875H0v-6.25h9.375V0h6.25z" />
          <path fill="#CF142B" fillRule="nonzero" d="M14.375 7.125H25v3.75H14.375V18h-3.75v-7.125H0v-3.75h10.625V0h3.75z" />
        </g>
      </svg>
    </div>
    <div className="language">English</div>
  </>
);

// TODO:
// Fix so that buttons lose focus/hover?
// design.nav.knapp has a button outline/background when active&focused we dont want
const LanguageSelector = () => {
  const [currentLanguage, setLanguage] = useState('');
  const [isLanguageMenuOpen, setLangaugeMenuState] = useState(false);

  useEffect(() => {
    const { language } = i18n;
    setLanguage(language || window.localStorage.i18nextLng);
  }, []);

  const handleSetLanguage = language => {
    if (currentLanguage !== language) {
      setLanguage(language);
      i18n.changeLanguage(language);
    }
    setLangaugeMenuState(!isLanguageMenuOpen);
  };

  return (
    <div className="languageselector">
      <Menu>
        <MenuButton className="languagebutton currentlanguage">
          {currentLanguage === 'nb' ? NB : EN}
          <div>
            <NavFrontendChevron type="ned" aria-hidden />
          </div>
        </MenuButton>
        <MenuList className="languagemenu">
          <MenuItem className="languagebutton" onSelect={() => handleSetLanguage('nb')}>
            {NB}
          </MenuItem>
          <MenuItem className="languagebutton" onSelect={() => handleSetLanguage('en')}>
            {EN}
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};
export default LanguageSelector;
