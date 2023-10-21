module.exports = {
  host: "localhost",
  port: process.env.PORT,
  origins: ["http://localhost:3000", "https://lms.sikaeducation.com"],
  paginate: {
    default: 10,
    max: 50,
  },
  mongodb: process.env.DATABASE_URL,
};
