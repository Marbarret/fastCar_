require("dotenv").config();

const config = {
  db: {
    uri: process.env.DB_URI,
    name: process.env.DB_NAME,
    collections: {
      items: "items",
    },
  },
  server: {
    port: process.env.PORT || 3000,
  },
};

module.exports = config;
