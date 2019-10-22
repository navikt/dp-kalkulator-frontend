import React from 'react';
import PropTypes from 'prop-types';
import Panel from 'nav-frontend-paneler';
import { Hovedknapp } from 'nav-frontend-knapper';
import { useTranslation } from 'react-i18next';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import Spacer from '../Components/Spacer';

export const SamtykkePanel = ({ onClickCallback }) => {
  const { t } = useTranslation();
  return (
    <Panel>
      <div className="padding16">
        <Innholdstittel tag="h2">{t('SAMTYKKEPANEL.HENTER_INFO_FRA_SKATTEETAEN_TITTEL')}</Innholdstittel>
        <Normaltekst>{t('SAMTYKKEPANEL.HENTER_INFO_FRA_SKATTEETAEN_INGRESS')}</Normaltekst>
        <Spacer twentyPx />
        <div className="flex center">
          <Hovedknapp onClick={onClickCallback}>{t('KNAPP.FORTSETT')}</Hovedknapp>
        </div>
      </div>
    </Panel>
  );
};

SamtykkePanel.propTypes = {
  onClickCallback: PropTypes.func.isRequired,
};

export default SamtykkePanel;
