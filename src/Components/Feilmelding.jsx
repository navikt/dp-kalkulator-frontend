import React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

const Feilmelding = ({ errors, click }) => {
  if (errors.length > 0) {
    return errors.map((error, index) => (
      <AlertStripeFeil key={index} onClick={() => click(index)}>
        {error.message}
      </AlertStripeFeil>
    ));
  }
  return null;
};

export default Feilmelding;
