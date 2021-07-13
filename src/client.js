import sanityClient from "@sanity/client";
import { isProduction } from "./utils/environment";

export default sanityClient({
  projectId: "rt6o382n",
  dataset: "production",
  withCredentials: "true",
  useCdn: isProduction(),
});
