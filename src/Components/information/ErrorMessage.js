import React from 'react';
import PanelBase from 'nav-frontend-paneler';

export default function ErrorMessage({ error }) {
  const parsedText = () => {
    if (!error.data) {
      return (error.status + " " + error.statusText)
    }
    else {
      return (error.status + " " + error.data.title)
    }
  }
  return (
    <PanelBase className="Error" border>
      {parsedText()}
    </PanelBase>
  );
}
