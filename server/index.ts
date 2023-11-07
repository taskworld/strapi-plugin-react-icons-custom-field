import type { Strapi } from "@strapi/strapi";

import config from "./config";
import controllers from "./controllers";
import routes from "./routes";

export default {
  config,
  controllers,
  routes,

  register({ strapi }: { strapi: Strapi }) {
    strapi.customFields.register({
      name: "react-icon",
      type: "string",
    });
  },
};
