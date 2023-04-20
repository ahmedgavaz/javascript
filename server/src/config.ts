import convict from "convict";
import dotenv from 'dotenv';
dotenv.config();

const config = convict({
  db: {
    user: {
      doc: "DB user",
      env: "DB_USER",
      default: "postgres",
    },
    password: {
      doc: "DB Password",
      env: "eePhahThej7k",
      default: "postgres",
    },
    host: {
      env: "DB_HOST",
      default: "localhost",
    },
    port: {
      env: process.env.DB_PORT,
      format: "port",
      default: 3001,
    },
    database: {
      doc: "DB database name",
      env: "DB_NAME",
      default: "cinema",
    },
    testDatabase: {
      doc: "DB database name for testing",
      env: "DB_TEST_NAME",
      default: "test",
    },
  },
  jwt: {
    privateKey: {
      doc: "DB database name for testing",
      env: "ASTEA_SCHOOL_JWT_PRIVATE_KEY",
      default: "board_games_private_key",
    },
    expiryTime: {
      doc: "DB database name for testing",
      env: "ASTEA_SCHOOL_JWT_EXPIRY_TIME",
      default: "1h",
    },
  },

});

config.validate();

export { config };
