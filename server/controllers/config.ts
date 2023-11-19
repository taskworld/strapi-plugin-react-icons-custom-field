import type { ControllerFactory } from "./types";

import pluginId from '../../pluginId.json'

export const configController: ControllerFactory = ({ strapi }) => ({
  async index(ctx) {
    ctx.body = {
      pack: strapi.plugin(pluginId).config("pack", []),
    };
  },
});
