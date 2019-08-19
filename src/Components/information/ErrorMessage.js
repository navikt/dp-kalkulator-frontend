import React from 'react';
import PanelBase from 'nav-frontend-paneler';

export default function ErrorMessage({errorObject}) {
    const parsedText = () => {
        if(errorObject.data == "")
        {
            return (errorObject.status.toString + " " + errorObject.statusText.toString())
        }
        else
        {
            return (errorObject.status.toString + " " + errorObject.data.title.toString())
        }
    }
  return (
      <PanelBase className="Error" border>
          { parsedText }
      </PanelBase>
  );
}
