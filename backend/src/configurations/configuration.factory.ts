export default () => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 3101,
    cors: {
      get allowedOrigins() {
        const allowedOrigins = process.env.ALLOWED_ORIGINS;
        if (allowedOrigins) {
          return allowedOrigins.split(',').map((i) => i.trim());
        }
        return ['*'];
      },
    },
    microservices: {
      service: {
        host: process.env.SERVICE_HOST || 'service',
        port: process.env.SERVICE_PORT || 3102,
      },
    },
  },
});
