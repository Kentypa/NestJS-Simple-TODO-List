export default () => ({
  frontend: {
    port: parseInt(process.env.FE_PORT || "5173", 10),
  },
  backend: {
    port: parseInt(process.env.BE_PORT || "3000", 10),
  },
});
