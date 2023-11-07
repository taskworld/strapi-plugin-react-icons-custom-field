export default {
  default: {
    pack: [],
  },
  validator: (config: any) => {
    if (!Array.isArray(config.pack)) {
      throw new Error("`pack` must be a string[]");
    }
  },
};
