import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import EmployersMonth from './EmployersMonth';

export default function AllMonths({ monthsIncomeInformation, year }) {
  const moment = require('moment');
  moment.locale('nb');
  return (
    <li>
      <Ekspanderbartpanel tittel={year} border>
        <Innholdstittel>Månedsoversikt</Innholdstittel>
        <ul>
          {monthsIncomeInformation.map(month => (<EmployersMonth key={month.month.toString()} month={month.month} employers={month.employers} />))}
        </ul>
      </Ekspanderbartpanel>
    </li>
  );
}
AllMonths.propTypes = {
  monthsIncomeInformation: PropTypes.arrayOf(PropTypes.shape()),
  year: PropTypes.string.isRequired,
};
