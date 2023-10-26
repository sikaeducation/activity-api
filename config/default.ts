export default {
  host: "localhost",
  port: 8080,
  origins: ["http://localhost", "https://lms.sikaeducation.com"],
  paginate: {
    default: 100,
    max: 1000,
  },
  mongodb: process.env.DATABASE_URL,
  mongoDatabase: process.env.DATABASE_NAME,
  authentication: {
    entity: null,
    authStrategies: ["jwt"],
    secret: "UNUSED",
  },
};
