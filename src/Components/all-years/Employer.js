import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'nav-frontend-typografi';
import Income from './Income';

export default function Employer({ name, incomes }) {
  return (
    <div>
      <Element>{name}</Element>
      <ul>
        {incomes.map(income => (<Income key={income.beskrivelse} income={income.income} verdikode={income.beskrivelse} />))}
      </ul>
    </div>
  );
}

Employer.propTypes = {
  name: PropTypes.string.isRequired,
  incomes: PropTypes.arrayOf(PropTypes.shape()),
};
