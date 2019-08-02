import React from 'react';
import PropTypes from 'prop-types';
import PanelBase from 'nav-frontend-paneler';
import EmployerList from './employer-list/EmployerList';
import AllYears from './all-years/AllYears';

export default function InformationSummary({ employerSummaries, monthsIncomeInformation }) {
  return (
    <PanelBase border>
      {employerSummaries === null ? <br />
        : (
          <EmployerList
            employerSummaries={employerSummaries}
          />
        )}
      {monthsIncomeInformation === null ? <br />
        : (
          <AllYears
            monthsIncomeInformation={monthsIncomeInformation}
          />
        )}
    </PanelBase>
  );
}

InformationSummary.propTypes = {
  employerSummaries: PropTypes.arrayOf(PropTypes.shape()),
  monthsIncomeInformation: PropTypes.arrayOf(PropTypes.shape()),
};
