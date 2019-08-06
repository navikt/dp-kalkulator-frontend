import React from 'react';
import Header from './Header';
import QualifiedMessage from './QualifiedMessage';
import RapporteringInfo from './information/RapporteringInfo';

export default function NoIncome() {
  return (
    <div className="App">
      <Header loading={false} />
      <em>
        Du har ingen registrert inntekt de siste 36 månedene i a-ordningen.
      </em>
      <QualifiedMessage doesPersonQualify={false} />
      <RapporteringInfo />
    </div>
  );
}
