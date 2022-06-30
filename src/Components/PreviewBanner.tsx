import React from "react";
import "./PreviewBanner.css";
import { getSanityConfig } from "../sanityClient";

function PreviewBanner() {
  const config = getSanityConfig();
  if (!config.preview) {
    return null;
  }

  return (
    <div className="previewbanner">
      <div>Preview</div>
      <div>{config.dataset}</div>
    </div>
  );
}

export default PreviewBanner;
