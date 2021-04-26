import sanityClient from "@sanity/client";
import { isDevelopment } from "./utils/environment";

export default sanityClient({
  projectId: "rt6o382n", // find this at manage.sanity.io or in your sanity.json
  dataset: "development", // this is from those question during 'sanity init'
  useCdn: !isDevelopment(),
});
