import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import QualifiedMessage from './QualifiedMessage';
import RapporteringInfo from './information/RapporteringInfo';

export default function NoIncome({ doesPersonQualify }) {
  return (
    <div className="App">
      <Header loading={false} />
      <QualifiedMessage doesPersonQualify={doesPersonQualify} />
      <em>
        Du har ingen registrert inntekt de siste 36 månedene i a-ordningen.
      </em>
      <RapporteringInfo />
    </div>
  );
}

NoIncome.propTypes = {
  doesPersonQualify: PropTypes.bool.isRequired,
};
