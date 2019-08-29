import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';

export default function Header() {
  const style = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  }
  return (
    <div className="header" style={style}>
      <img src="https://www.nav.no/_public/beta.nav.no/images/logo.png?_ts=1512923c9b0" alt="NAV-logo-rød-trans-bg-200.png" />
      <Sidetittel>
        Estimering av dagpenger
      </Sidetittel>
    </div>
  );
}

