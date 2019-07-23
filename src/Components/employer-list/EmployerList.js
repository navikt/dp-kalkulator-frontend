import { Innholdstittel } from 'nav-frontend-typografi';
import React from 'react';
import HjelpetekstBase from 'nav-frontend-hjelpetekst';
import PropTypes from 'prop-types';
import EmployerSummary from './EmployerSummary';

export default function EmployerList({ employerSummaries }) {
  return (
    <div>
      <Innholdstittel>
Arbeidsgivere
        <HjelpetekstBase type="auto"> Dine arbeidsgivere de 36 siste månedene.</HjelpetekstBase>
      </Innholdstittel>
      <ul>
        <li>
          {employerSummaries.map(
            employerSummary => (
              <EmployerSummary
                key={employerSummary.name}
                name={employerSummary.name}
                income={employerSummary.income}
                employmentPeriodes={employerSummary.employmentPeriodes}
              />
            ),
          )}
        </li>
      </ul>
    </div>
  );
}

EmployerList.propTypes = {
  employerSummaries: PropTypes.arrayOf(PropTypes.shape()),
};
