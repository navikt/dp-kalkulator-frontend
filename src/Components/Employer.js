import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import React from 'react';
import PropTypes from 'prop-types';
import Income from "./Income";
export default function Employer({ name, incomes }) {
  return (<li>
    <Ekspanderbartpanel tittel={name} border>
      <ul>
        {incomes.map(income => (<Income key={income.verdikode} income={income.income} verdikode={income.verdikode} />))}
      </ul>
    </Ekspanderbartpanel>
  </li>);
}
Employer.propTypes = {
  name: PropTypes.string.isRequired,
  incomes: PropTypes.arrayOf(PropTypes.shape()),
};
