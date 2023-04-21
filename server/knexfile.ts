import type { Knex } from "knex";
import * as dotenv from 'dotenv';
import { config } from "./src/config";
import { knexSnakeCaseMappers } from "objection";

dotenv.config();
// Update with your config settings.

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      host : process.env.DB_HOST,
      port : 5432,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    debug: true,
    migrations: {
      tableName: "knex_migrations"
    }
  },
  test: {
    client: 'postgresql',
    connection: {
      host : process.env.DB_HOST,
      port : 5432,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_TEST_NAME
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    ...knexSnakeCaseMappers(),
  }

};

export default knexConfig;
