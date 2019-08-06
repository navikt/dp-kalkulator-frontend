import React from 'react';
import Header from './Header';
import QualifiedMessage from './QualifiedMessage';

export default function NoIncome() {
  return (
    <div>
      <Header loading={false} />
      <div>
        Du har ingen registrert inntekt de siste 36 månedene i a-ordningen.
      </div>
      <QualifiedMessage doesPersonQualify={false} />
    </div>
  );
}
