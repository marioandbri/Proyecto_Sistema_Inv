import { Sequelize } from "sequelize";
const { PGSQL_SERVER, PGSQL_PASSWORD, PGSQL_USER } = process.env;

export const sequelize = new Sequelize("postgres", PGSQL_USER, PGSQL_PASSWORD, {
  host: PGSQL_SERVER,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000,
  },
  logging: false,
});
