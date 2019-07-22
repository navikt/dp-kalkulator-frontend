import React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import AllMonths from './AllMonths';

export default function AllYears({ monthsIncomeInformation }) {
  const yearBuckets = [[], [], [], []];
  for (let i = 0; i < monthsIncomeInformation.length; i += 1) {
    yearBuckets[(monthsIncomeInformation[i].month.split('-')[0])
    % 4].push(monthsIncomeInformation[i]);
  }
  const noEmptyYearBuckets = yearBuckets.filter(year => year.length > 0);
  noEmptyYearBuckets.sort((list1, list2) => ((list2[0]).month.split('-')[0] - (list1[0]).month.split('-')[0]));
  return (
    <div>
      <Innholdstittel>Årsoversikt</Innholdstittel>
      <ul>
        {noEmptyYearBuckets.map(monthIncomeInformation => (
          <AllMonths
            key={monthIncomeInformation[0].month.split('-')[0]}
            monthsIncomeInformation={monthIncomeInformation}
            year={monthIncomeInformation[0].month.split('-')[0]}
          />
        ))}
      </ul>
    </div>
  );
}

AllYears.propTypes = {
  monthsIncomeInformation: PropTypes.arrayOf(PropTypes.shape()),
};
