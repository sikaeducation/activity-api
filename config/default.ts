export default {
  host: "localhost",
  port: 80,
  origins: ["http://localhost:3000", "https://lms.sikaeducation.com"],
  paginate: {
    default: 100,
    max: 1000,
  },
  mongodb: process.env.DATABASE_URL,
  authentication: {
    entity: null,
    authStrategies: ["jwt"],
    secret: "UNUSED",
  },
};
