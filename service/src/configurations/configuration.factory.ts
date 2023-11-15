export default () => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 3101,
    host: process.env.HOST || 'service',
  },
});
