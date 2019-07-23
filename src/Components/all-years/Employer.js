import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import React from 'react';
import PropTypes from 'prop-types';
import Income from './Income';
import PanelBase from 'nav-frontend-paneler';
import { Element } from 'nav-frontend-typografi';

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
