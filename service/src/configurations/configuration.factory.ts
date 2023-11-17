export default () => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 3102,
    host: process.env.HOST || 'service',
  },
});
