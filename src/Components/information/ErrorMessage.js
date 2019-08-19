import React from 'react';
import PanelBase from 'nav-frontend-paneler';

export default function ErrorMessage({ message }) {
  return (
      <PanelBase className="Error" border>
        { message }
      </PanelBase>
  );
}
