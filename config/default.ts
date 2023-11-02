export default {
  host: "localhost",
  port: Number(process.env.PRIVATE_PORT),
  publicPort: Number(process.env.PUBLIC_PORT),
  paginate: {
    default: 100,
    max: 1000,
  },
  mongodb: process.env.DATABASE_URL,
  mongoDatabase: "activityService",
  authentication: {
    entity: null,
    authStrategies: ["jwt"],
    secret: "UNUSED",
  },
};
