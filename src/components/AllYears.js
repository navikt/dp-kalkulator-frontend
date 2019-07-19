import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';

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

function AllMonths({ monthsIncomeInformation, year }) {
  const moment = require('moment');
  moment.locale('nb');
  return (
    <li>
      <Ekspanderbartpanel tittel={year} border>
        <Innholdstittel>Månedsoversikt</Innholdstittel>
        <ul>
          {monthsIncomeInformation.map(
            month => (
              <EmployersMonth
                key={month.month.toString()}
                month={month.month}
                employers={month.employers}
              />
            ),
          )}
        </ul>
      </Ekspanderbartpanel>
    </li>
  );
}

AllMonths.propTypes = {
  monthsIncomeInformation: PropTypes.arrayOf(PropTypes.shape()),
  year: PropTypes.string.isRequired,
};

function EmployersMonth({ month, employers }) {
  const moment = require('moment');
  moment.locale('nb');
  return (
    <li>
      <Ekspanderbartpanel
        tittel={moment(month.toString(), 'YYYY-MM').format(
          'MMMM YYYY',
        )}
        border
      >
        <ul>
          {employers.map(
            employer => (
              <Employer
                key={employer.name}
                name={employer.name}
                incomes={employer.incomes}
              />
            ),
          )}
        </ul>
      </Ekspanderbartpanel>
    </li>
  );
}

EmployersMonth.propTypes = {
  month: PropTypes.string.isRequired,
  employers: PropTypes.arrayOf(PropTypes.shape()),
};

function Employer({ name, incomes }) {
  return (
    <li>
      <Ekspanderbartpanel tittel={name} border>
        <ul>
          {incomes.map(
            income => (
              <Income
                key={income.verdikode}
                income={income.income}
                verdikode={income.verdikode}
              />
            ),
          )}
        </ul>
      </Ekspanderbartpanel>
    </li>
  );
}

Employer.propTypes = {
  name: PropTypes.string.isRequired,
  incomes: PropTypes.arrayOf(PropTypes.shape()),
};

function Income({ verdikode, income }) {
  return (
    <ul>
      {`${verdikode}: ${income}`}
    </ul>
  );
}

Income.propTypes = {
  verdikode: PropTypes.string.isRequired,
  income: PropTypes.number.isRequired,
};
