import type { ControllerFactory } from "./types";

export const configController: ControllerFactory = ({ strapi }) => ({
  async index(ctx) {
    ctx.body = {
      pack: strapi.plugin("react-icons-custom-field").config("pack", []),
    };
  },
});
