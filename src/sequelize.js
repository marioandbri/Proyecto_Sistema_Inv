import { Sequelize } from "sequelize";
const { PGSQL_SERVER, PGSQL_PASSWORD } = process.env;

export const sequelize = new Sequelize("postgres", "postgres", PGSQL_PASSWORD, {
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
