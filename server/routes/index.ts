export default [
  {
    method: "GET",
    path: "/",
    handler: "config.index",
    config: {
      auth: false,
    },
  },
];
