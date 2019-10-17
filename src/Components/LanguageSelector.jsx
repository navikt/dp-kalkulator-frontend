import React from 'react';
import { ToggleGruppe } from 'nav-frontend-toggle';
import i18n from '../i18n';

// TODO:
// Fix so that buttons lose focus/hover?
// design.nav.knapp has a button outline/background when active&focused we dont want
const LanguageSelector = () => {
  const handleSetLanguage = language => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="languageselector flexend">
      <ToggleGruppe
        minstEn
        kompakt
        defaultToggles={[{ children: 'NB', value: 'nb', pressed: true }, { children: 'EN', value: 'en' }]}
        onChange={(event, toggles) => handleSetLanguage(toggles.filter(toggle => toggle.pressed)[0].value)}
      />
    </div>
  );
};
export default LanguageSelector;
