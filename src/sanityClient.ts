import sanityClient from "@sanity/client";
import { isProduction } from "./utils/environment";

const URLParams = new URLSearchParams(window.location.search);
const preview = URLParams.get("preview") === "true";
const dataset = URLParams.get("dataset") || "production";

const config = {
  projectId: "rt6o382n",
  dataset: dataset,
  withCredentials: preview,
  useCdn: preview ? false : isProduction(),
};

export default sanityClient(config);
