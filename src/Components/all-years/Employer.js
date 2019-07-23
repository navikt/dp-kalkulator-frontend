import React from 'react';
import PropTypes from 'prop-types';
import PanelBase from 'nav-frontend-paneler';
import { Element } from 'nav-frontend-typografi';
import Income from './Income';

export default function Employer({ name, incomes }) {
  return (
    <li>
      <PanelBase border>
        <Element>{name}</Element>
        <ul>
          {incomes.map(income => (<Income key={income.verdikode} income={income.income} verdikode={income.verdikode} />))}
        </ul>
      </PanelBase>
    </li>
  );
}
Employer.propTypes = {
  name: PropTypes.string.isRequired,
  incomes: PropTypes.arrayOf(PropTypes.shape()),
};
